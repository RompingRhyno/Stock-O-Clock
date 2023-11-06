function displayFoodInfo() {
  let params = new URL( window.location.href ); //get URL of search bar
  let ID = params.searchParams.get( "docID" ); //get value for key "id"
  console.log( ID );

  // doublecheck: is your collection called "Reviews" or "reviews"?
  db.collection( "foods" )
      .doc( ID )
      .get()
      .then( doc => {
          thisFood = doc.data();
          foodCode = thisFood.code;
          foodName = doc.data().name;
          
          // only populate title, and image
          document.getElementById( "foodName" ).innerHTML = foodName;
      } );
}
displayFoodInfo();