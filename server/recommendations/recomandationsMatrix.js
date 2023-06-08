

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
        // console.log("*****matrix*****")
         console.log(this.matrix)
         console.log("*****matrix*****")
    }
    static updatedRecipe(updatedRecipe){
        console.log("in updateRR")
        let former = this.recipes.find(x => x._id == updatedRecipe._id)
        if(updatedRecipe.published){
            if(former == undefined){
                console.log("no such recipe")
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
            console.log("in else")
            if(former != undefined){
                console.log("in if in else")
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
    const similarity = (intersection.size) / (union.size + 1 );
    // Round the similarity to two decimal places 
    return parseFloat(similarity.toFixed(2));
    }
    
    static recipeSimilarity(recipe1, recipe2){
        //similarity of type
        let typeSimilarity = RecommendationsMatrix.wordsSimilarity(recipe1.types,recipe2.types)
        // similarity of tags 
        let tagsSimilarity = RecommendationsMatrix.wordsSimilarity(recipe1.tags,recipe2.tags)  
        //similarity of ingridients
        let ingredientsSimilarity =  RecommendationsMatrix.wordsSimilarity(recipe1.ingredients ,recipe2.ingredients)
        return parseFloat(((typeSimilarity + tagsSimilarity + 0.4 * ingredientsSimilarity)/ 2.4).toFixed(2))
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
        console.log("after adding::")
        console.log(this.matrix)

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
        let publicRecipes = this.recipes.filter(x => !(favorites.includes(x._id)) && !(myRecipes.find(y=> y._id == x._id)) && x.published )
        if(favorites.length > 0){
        //console.log(this.matrix[2][1])
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
            if(publicRecipes.find(x => x._id == idVector[i].toString())){
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


/*

let r1 = {'id' : 1, 'tags' : ["kasher", "veg"], 'ingridients' : ["sugar", "water", "salt"], 'types' : ["italian", "fast"]}
let r2 = {'id' : 2, 'tags' : ["free", "veg", "no sugar"], 'ingridients' : [ "water", "salt", "pepper"], 'types' : ["italian"]}
recipes = [r1]

RecommendationsMatrix.createMatrix(recipes)

RecommendationsMatrix.addReciepeToMatrix(r2, recipes);
//console.log(matrix)
recipes.push(r2)
let r3 = {'id' : 3, 'tags' : ["free", "veg", "no sugar"], 'ingridients' : [ "water", "salt", "pepper","bla"], 'types' : ["italian"]}
recipes.push(r3)

let r4 = {'id' : 4, 'tags' : ["kasher", "veg", "no sugar"], 'ingridients' : [ "water", "salt", "pepper","bla"], 'types' : ["italian", "fast","gg"]}
RecommendationsMatrix.addReciepeToMatrix(r3,recipes);
//console.log(matrix)Fc

RecommendationsMatrix.addReciepeToMatrix(r4, recipes);
//console.log(matrix)

recipes.push(r4)
// matrix[2][0] = 0
// matrix[0][2] = 0

let r5 = {'id' : 5, 'tags' : ["no sugar"], 'ingridients' : ["bla"], 'types' : ["italian", "fast"]}
recipes.push(r5)

console.log("*****************************************8")
RecommendationsMatrix.addReciepeToMatrix(r5, recipes);
RecommendationsMatrix.removeReciepe(5)
//console.log(matrix)
//console.log(topKRecommendedrecipes(recipes,[4,3],matrix, 4))
console.log(RecommendationsMatrix.findMostKSimilarrecipes(1,3))  


*/