

class RecommendationsMatrix{
    
    static matrix =[];
    static recipies=[];


    static createMatrix(reciepies){
        this.matrix = [[0,0],[0,0]];
        for(let i = 0; i< reciepies.length; i++){
            this.recipies.push(reciepies[i])            
        }
        for(let i = 0; i< reciepies.length; i++){
            RecommendationsMatrix.addReciepeToMatrix(reciepies[i]);
        }
        // console.log("*****matrix*****")
        // console.log(this.matrix)
        // console.log("*****matrix*****")
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
    
    static getSimilarityVector(newReciepe, recipies){
    
        //let newReciepeId = newReciepe.id
        let simVector = [1,newReciepe._id]
        for (let i = 2; i < this.matrix.length ; i++){
            if(this.matrix[0][i] != 0){
                let reciepeId = this.matrix[1][i]
                simVector.push(RecommendationsMatrix.recipeSimilarity(newReciepe, recipies.find(x => x._id == reciepeId)))
            }
            else{
                simVector.push(0)
            }
        }
        return simVector
    }   
    
    static addReciepeToMatrix(newReciepe){
        this.recipies.push(newReciepe)
        let len, index = this.matrix[0].length
        let addRow = true
        for(let i = 2 ; i< this.matrix[0].length; i++){
            if (this.matrix[0][i] == 0){ // 0 means that the column isn't valid
                index = i
                addRow = false;
                break;
            }
        }
        let simVector = RecommendationsMatrix.getSimilarityVector(newReciepe,this.recipies)
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
            toRet.push(this.recipies.find(x => x._id == jsonList[i].id))
        }
        return toRet
    }

    static findMostKSimilarRecipies(recipeId, k){
        let simVector = this.matrix.find(x => x[1] == recipeId)
        let idVector = this.matrix[1]
        let jsonList = [] 
        for(let i = 2; i< this.matrix[0].length; i++){
            if(this.matrix[0][i]){
                jsonList.push({"id" : idVector[i], "similarity" : simVector[i]})
            }
        }
        return(RecommendationsMatrix.findTopKSimilarities(jsonList,k))
    }
    
    static topKRecommendedRecipies(favorites, k){
        if(favorites.length == 0){
            return null
        }
        let favoriteSet =new Set(favorites)
        let simVector = this.matrix.find(x => x[1] == favorites[0])
        let idVector = this.matrix[1]
        let jsonList = [] 
        
        for(let i = 1; i< favorites.length; i++){
                let currentVector = this.matrix.find(x => x[1] == favorites[i])
                
                for(let j = 0; j < currentVector.length; j++){
                    simVector[j] += currentVector[j]
                }
        }
        for(let i = 2; i< this.matrix[0].length; i++){
            if(!(favoriteSet.has(idVector[i].toString())) && this.matrix[0][i]){
                jsonList.push({"id" : idVector[i], "similarity" : simVector[i]})
            }
        }
        return(RecommendationsMatrix.findTopKSimilarities(jsonList,k))
    }
    
    static removeReciepe(reciepeId){
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
recipies = [r1]

RecommendationsMatrix.createMatrix(recipies)

RecommendationsMatrix.addReciepeToMatrix(r2, recipies);
//console.log(matrix)
recipies.push(r2)
let r3 = {'id' : 3, 'tags' : ["free", "veg", "no sugar"], 'ingridients' : [ "water", "salt", "pepper","bla"], 'types' : ["italian"]}
recipies.push(r3)

let r4 = {'id' : 4, 'tags' : ["kasher", "veg", "no sugar"], 'ingridients' : [ "water", "salt", "pepper","bla"], 'types' : ["italian", "fast","gg"]}
RecommendationsMatrix.addReciepeToMatrix(r3,recipies);
//console.log(matrix)Fc

RecommendationsMatrix.addReciepeToMatrix(r4, recipies);
//console.log(matrix)

recipies.push(r4)
// matrix[2][0] = 0
// matrix[0][2] = 0

let r5 = {'id' : 5, 'tags' : ["no sugar"], 'ingridients' : ["bla"], 'types' : ["italian", "fast"]}
recipies.push(r5)

console.log("*****************************************8")
RecommendationsMatrix.addReciepeToMatrix(r5, recipies);
RecommendationsMatrix.removeReciepe(5)
//console.log(matrix)
//console.log(topKRecommendedRecipies(recipies,[4,3],matrix, 4))
console.log(RecommendationsMatrix.findMostKSimilarRecipies(1,3))  


*/