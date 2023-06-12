const RecommendationsMatrix = require("./recomandationsMatrix")

let r1 = {'_id' : 1, 'tags' : ["kasher", "veg"], published: true, 'ingredients' : ["sugar", "water", "salt"], 'types' : ["italian", "fast"]}
let r2 = {'_id' : 2, 'tags' : ["free", "veg", "no sugar"], published: true, 'ingredients' : [ "water", "salt", "pepper"], 'types' : ["italian"]}
//  const sum = require('./recomandationsMatrix');
test('check recipe similarity of recipe1, recipe2 (0.32)', () => {
    expect(RecommendationsMatrix.recipeSimilarity(r1,r2)).toBe(0.32)
});

let r3 = {'_id' : 3, 'tags' : ["free", "veg", "no sugar"], published: true, 'ingredients' : [ "water", "pepper","bla"], 'types' : ["italian"]}
test('check recipe similarity of recipe1, recipe3 (0.28)', () => {
    expect(RecommendationsMatrix.recipeSimilarity(r1,r3)).toBe(0.28)
});

test('check recipe similarity of recipe2, recipe3 (0.56)', () => {
    expect(RecommendationsMatrix.recipeSimilarity(r2,r3)).toBe(0.56)
});

let recipes = [r1,r2,r3]
test('check recipe matrix for recipes r1,r2,r3', () => {
    
    RecommendationsMatrix.createMatrix(recipes)
    let expectedMatrix = [[0, 0, 1, 1, 1],
                          [0 , 0, 1, 2, 3],
                          [1, 1, 0, 0.32, 0.28],
                          [1, 2, 0.32, 0, 0.56],
                          [1, 3, 0.28, 0.56, 0]]
    expect(RecommendationsMatrix.getMatrix()).toStrictEqual(expectedMatrix)
});


let r4 = {'_id' : 4, 'tags' : ["kasher", "veg"],published: true, 'ingredients' : ["sugar","water", "bla"], 'types' : ["fast", "gg"]}

test('check recipe similarity of recipe1, recipe4 (0.44)', () => {
    expect(RecommendationsMatrix.recipeSimilarity(r1,r4)).toBe(0.44)
});

test('check recipe similarity of recipe2, recipe4 (0.16)', () => {
    expect(RecommendationsMatrix.recipeSimilarity(r2,r4)).toBe(0.16)
});

test('check recipe similarity of recipe3, recipe4 (0.2)', () => {
    expect(RecommendationsMatrix.recipeSimilarity(r3,r4)).toBe(0.2)
});

test('check recipe matrix for recipes r1,r2,r3', () => {
    
    RecommendationsMatrix.addReciepeToMatrix(r4)
    let expectedMatrix = [[0, 0, 1, 1, 1, 1],
                          [0 , 0, 1, 2, 3, 4],
                          [1, 1, 0, 0.32, 0.28, 0.44],
                          [1, 2, 0.32, 0, 0.56, 0.16],
                          [1, 3, 0.28, 0.56, 0, 0.2],
                          [1, 4, 0.44, 0.16, 0.2, 0]]
    expect(RecommendationsMatrix.getMatrix()).toStrictEqual(expectedMatrix)
});


test('check the 2 recipes most similar to recipe 4 (should be [r1,r3])', () => {
    // RecommendationsMatrix.addReciepeToMatrix(r4)
    expect(RecommendationsMatrix.topKRecommendedrecipes([r4._id],[],2)).toStrictEqual([r1,r3])
});



test('check the 2 recipes most similar to recipe 1 (should be [r4,r2])', () => {
    expect(RecommendationsMatrix.topKRecommendedrecipes([r1._id],[],2)).toStrictEqual([r4,r2])
});

test('check the matrix after removing recipe 2', () => {
    RecommendationsMatrix.removeReciepe(2)
    expectedMatrix = [[0, 0, 1, 0, 1, 1],
                      [0 , 0, 1, 2, 3, 4],
                      [1, 1, 0, 0.32, 0.28, 0.44],
                      [0, 2, 0.32, 0, 0.56, 0.16],
                      [1, 3, 0.28, 0.56, 0, 0.2],
                      [1, 4, 0.44, 0.16, 0.2, 0]]
    expect(RecommendationsMatrix.getMatrix()).toStrictEqual(expectedMatrix)
});

test('check the 2 recipes most similar to recipe 1 after deletion of recipe 2 (should be [r4,r3])', () => {
    RecommendationsMatrix.removeReciepe(2)
    expect(RecommendationsMatrix.topKRecommendedrecipes([r1._id],[],2)).toStrictEqual([r4,r3])
    RecommendationsMatrix.addReciepeToMatrix(r2)
});

test('check the 2 recipes most similar to recipe 1 after deletion of recipe 2 (should be [r4,r3])', () => {
    RecommendationsMatrix.removeReciepe(2)
    expect(RecommendationsMatrix.topKRecommendedrecipes([r1._id],[],2)).toStrictEqual([r4,r3])
    RecommendationsMatrix.addReciepeToMatrix(r2)
});
