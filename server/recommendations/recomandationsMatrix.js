

class RecommendationsMatrix{
    
    static matrix =[];
    static recipes=[];


    static createMatrix(reciepes){
        this.matrix = [[0,0],[0,0]];
        for(let i = 0; i< reciepes.length; i++){
            this.recipes.push(reciepes[i])                        
        }
        for(let i = 0; i< reciepes.length; i++){
            RecommendationsMatrix.addReciepeToMatrix(reciepes[i]);
        }
       
         console.log("*****matrix*****")
    }
    static updatedRecipe(updatedRecipe){
        let former = this.recipes.find(x => x._id == updatedRecipe._id)
        if(updatedRecipe.published){
            if(former == undefined){
                return;
            }
            former.title = updatedRecipe.title,
            former.ingredients = updatedRecipe.ingredients,
            former.instructions = updatedRecipe.instructions,
            former.image = updatedRecipe.imagae,
            former.tags= updatedRecipe.tags,
            former.types = updatedRecipe.types   
            }
        else{
            if(former != undefined){
                this.removeReciepe(updatedRecipe._id)
            }
        }
}
    
    static wordsSimilarity(list1, list2) {
    // Convert the lists to sets to remove duplicates
    const set1 = new Set(list1);
    const set2 = new Set(list2);
    
    // Get the intersection of the two sets
    const intersection = new Set([...set1].filter(word => set2.has(word)));
    
    // Get the union of the two sets
    const union = new Set([...set1, ...set2]);
    
    // Calculate the Jaccard similarity coefficient
    const similarity = (intersection.size) / (10*(union.size));
    // Round the similarity to two decimal places 
    return intersection.size //, parseFloat(similarity.toFixed(2));
    }
    
    // static recipeSimilarity(recipe1, recipe2){
    //     //similarity of type
    //     let typeIntersection, typeRatio = RecommendationsMatrix.wordsSimilarity(recipe1.types,recipe2.types)
    //     let typeSimilarity = Math.max(typeIntersection * 0.08 + typeRatio , 0.4)
    //     // similarity of tags 
    //     let tagsIntersection, tagsRatio = RecommendationsMatrix.wordsSimilarity(recipe1.tags,recipe2.tags)  
    //     let tagsSimilarity = Math.max(tagsIntersection * 0.08 + tagsRatio, 0.4)
    //     //similarity of ingridients
    //     let ingIntersection ,ingredientsRatio =  RecommendationsMatrix.wordsSimilarity(recipe1.ingredients ,recipe2.ingredients)
    //     let ingredientsSimilarity = Math.max(ingIntersection * 0.02 + ingredientsRatio , 0.3)
    //     return parseFloat(((typeSimilarity + tagsSimilarity + 0.4 * ingredientsSimilarity)/ 2.4).toFixed(2))
    // }

    static recipeSimilarity(recipe1, recipe2){
        //similarity of type
        let typeIntersection = RecommendationsMatrix.wordsSimilarity(recipe1.types,recipe2.types)
        let typeSimilarity = Math.min(typeIntersection * 0.12 , 0.4)
        // similarity of tags 
        let tagsIntersection = RecommendationsMatrix.wordsSimilarity(recipe1.tags,recipe2.tags)  
        let tagsSimilarity = Math.min(tagsIntersection * 0.12 , 0.4)
        //similarity of ingridients
        let ingIntersection =  RecommendationsMatrix.wordsSimilarity(recipe1.ingredients ,recipe2.ingredients)
        let ingredientsSimilarity = Math.min(ingIntersection * 0.04 , 0.3)
        return parseFloat(((typeSimilarity + tagsSimilarity + ingredientsSimilarity)).toFixed(2))
    }
    static getMatrix(){
        return this.matrix
    }
    
    static getSimilarityVector(newReciepe, recipes){
    
        //let newReciepeId = newReciepe.id
        let simVector = [1,newReciepe._id]
        for (let i = 2; i < this.matrix.length ; i++){
            if(this.matrix[0][i] != 0){
                let reciepeId = this.matrix[1][i]
                simVector.push(RecommendationsMatrix.recipeSimilarity(newReciepe, recipes.find(x => x._id == reciepeId)))
            }
            else{
                simVector.push(0)
            }
        }
        return simVector
    }   
    
    static addReciepeToMatrix(newReciepe){
        
        if(!(this.recipes.find(x => x._id == newReciepe._id))){
            this.recipes.push(newReciepe)
        }
        let len, index = this.matrix[0].length
        let addRow = true
        for(let i = 2 ; i< this.matrix[0].length; i++){
            if (this.matrix[0][i] == 0){ // 0 means that the column isn't valid
                index = i
                addRow = false;
                break;
            }
        }
        let simVector = RecommendationsMatrix.getSimilarityVector(newReciepe,this.recipes)
        if(addRow){
            simVector.push(0) // the right bottom coenrer -- the reciepe with himself
            this.matrix.push(simVector)
            for(let i = 0; i < this.matrix.length-1; i++){
                this.matrix[i].push(simVector[i])
            }
        }else{
            this.matrix[index] = simVector
            for(let i = 0; i < this.matrix.length; i++){
                this.matrix[i][index]= simVector[i]
            }
        }
  

    }
    static findTopKSimilarities(jsonList, k){
        let toRet = []
        jsonList.sort((a, b) => b.similarity - a.similarity);
        if(jsonList.length > k){
            jsonList = jsonList.slice(0,k)
            //console.log(jsonList)
        }
        for(let i = 0; i< jsonList.length; i++){
            toRet.push(this.recipes.find(x => x._id == jsonList[i].id))
        }
        return toRet
    }

    static findMostKSimilarrecipes(recipeId, k){
        let simVector = this.matrix.find(x => x[1] == recipeId).slice()
        let idVector = this.matrix[1]
        let jsonList = [] 
        for(let i = 2; i< this.matrix[0].length; i++){
            if(this.matrix[0][i]){
                jsonList.push({"id" : idVector[i], "similarity" : simVector[i]})
            }
        }
        return(RecommendationsMatrix.findTopKSimilarities(jsonList,k))
    }
    
    static topKRecommendedrecipes(favorites, myRecipes, k){
        let jsonList = []
        let publicRecipes = this.recipes.filter(x => !(favorites.includes(x._id.toString())) && !(myRecipes.includes(x._id.toString())) && x.published )
        if(favorites.length > 0){

        let favoriteSet =new Set(favorites)
        let simVector = this.matrix.find(x => x[1] == favorites[0]).slice()
        let idVector = this.matrix[1]
         
        
        for(let i = 1; i< favorites.length; i++){
                let currentVector = this.matrix.find(x => x[1] == favorites[i])
                for(let j = 0; j < currentVector.length; j++){
                    simVector[j] += currentVector[j]
                }
        }
        
        for(let i = 2; i< this.matrix[0].length; i++){
            if(publicRecipes.find(x => x._id == idVector[i].toString()) && this.matrix[0][i]){
                jsonList.push({"id" : idVector[i], "similarity" : simVector[i]})
            }
        }
    }
        
        if(jsonList.length < k){
            
            publicRecipes.sort((a, b) => b.userFavoritesCount - a.userFavoritesCount);
            let remain = k - jsonList.length
            for(let i = 0; i< remain; i++){
                if(!(jsonList.find(x => x.id == publicRecipes[i]._id))){
                    
                    jsonList.push({"id" : publicRecipes[i]._id, "similarity" : 0})
                }
            }
        }
        return(RecommendationsMatrix.findTopKSimilarities(jsonList,k))
    }
    
    static removeReciepe(reciepeId){
        this.recipes = (this.recipes.filter(x => x._id != reciepeId))
        let index = 0
        for(let i = 2; i < this.matrix[0].length; i++){
            if(this.matrix[1][i] == reciepeId){
                index = i
                break;
            }
        }
        this.matrix[0][index]= 0
        this.matrix[index][0] = 0
    }
      
}
module.exports = RecommendationsMatrix

