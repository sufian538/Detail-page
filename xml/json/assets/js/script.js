$(document).ready(function(){
    $.ajax({
        url:"assets/data.json",
        type:"get",
        success:function(brands){
// console.log(brands)
let apple ="";
// let realme = "";
$.each(brands,function(keys,arrays){
    // if(keys=="apple"){
// console.log(arrays)
        $.each(arrays,function(index,objects){
      apple+=`<div class="col-lg-3 mt-3">
                      <div class="card">
                          <img class="card-img-top" src="${objects.image}" alt="Title" />
                          <div class="card-body">
                              <h4 class="card-title">${objects.name}</h4>
                              <p class="card-text">Rs: ${objects.price}</p>
                              <a href = "detail.html?product=${keys+index}" class="btn btn-info">detail</a>
                          </div>
                      </div>
                      
                  </div>`
        })
    // }else if(keys=="realme"){
    //     $.each(arrays,function(index,objects){
    //         realme+=`    <div class="col-lg-3 mt-3">
    //                         <div class="card">
    //                             <img class="card-img-top" src="${objects.image}" alt="Title" />
    //                             <div class="card-body">
    //                                 <h4 class="card-title">${objects.name}</h4>
    //                                 <p class="card-text">Rs: ${objects.price}</p>
    //                                 <a href = "detail.html?product=${keys+index}=" class="btn btn-info">detail</a>
    //                             </div>
    //                         </div>
                            
    //                     </div>`
    //           })
    // }
})
// $("#datarealme").html(realme)
$("#data").html(apple)
        }
    })
})
// detail page
let url = window.location.href;
// console.log(url);
let getUrl = new URL(url);
// console.log(getUrl)
let getQueryString  = getUrl.searchParams.get("product");
// console.log(getQueryString);
$.ajax({
    url:"assets/data.json",
    type:"get",
    success:function(detailProducts){
        $.each(detailProducts,function(detKey, detArray){
            // console.log(detKey)
            $.each(detArray,function(detIndex,detobjects){
                // console.log()
                let concatVal =detKey+detIndex
if(concatVal==getQueryString){
    // console.log(detobjects)

    $("#detailImage").html(`
                <img class="card-img-top" src="${detobjects.image}" alt="Title" />
        `);
        $("#detailDes").html(`    <div class="card-body">
        <h4 class="card-title">${detobjects.name}</h4>
        <p class="card-text">Rs: ${detobjects.price}</p>
        <p class="card-text">${detobjects.description}</p>
      <button
        type="button"
        class="btn btn-outline-danger"
        onclick="Decreament()"
      >
      -
      </button>
    
      
        <input
            type="number"
            class=""
            name=""
            id="number"
            value="1"
            aria-describedby="helpId"
            placeholder=""
        />
       
        <button
        type="button"
        class="btn btn-outline-success"
        onclick="Increament()"
      >
   +
      </button>
      
    </div>
    <button
        type="button"
        class=" mt-3 btn btn-outline-primary"
        onclick="AddToCart('${getQueryString}')"
    >
       Add To Cart
    </button>`)
}
            })
        })
    }

})
// add to cart
let count =1;
function Increament(){
count++;
document.querySelector("#number").value=count;
}
function Decreament(){
    if(count>1){

    
    count--;
    document.querySelector("#number").value=count;

    }else{
        document.querySelector("#number").value=1
    }

}

function AddToCart(id){
// console.log(id)
// console.log(detailProducts)
let quantity = $("#number").val();
$.ajax({
    url:"assets/data.json",
    type:"get",
    success:function(cartProducts){
        $.each(cartProducts,function(cartKeys,cartArrays){
            $.each(cartArrays,function(cartIndex,cartObject){
               
                if(cartKeys+cartIndex==id){
                   let localdata = JSON.parse(localStorage.getItem("cartData"));
                   console.log(cartObject.name)
                if(localdata==null){
                    localStorage.setItem("cartData",'[]')
                }
               
                        //  console.log(parseJson);
let obj = {
    productId :id,
    productName:cartObject.name,
    productPrice:cartObject.price,
    productImage:cartObject.image,
    productQuantity:quantity
}
localdata.push(obj);
localStorage.setItem("cartData",JSON.stringify(localdata));
location.assign("index.html");

                }

            })
        })
    }
})
}
// cart count
let cartData = JSON.parse(localStorage.getItem("cartData"));
let cart=0;
if(cartData==null){
    $("#cartCount").html(0);
}else{
 let cartLength = cartData.length;
// console.log(cartData);
//  cart=cart+cartLength;
// console.log(cart);
$("#cartCount").html(cartLength);

}
// localStorage.clear()
// view Cart
let CartData = JSON.parse(localStorage.getItem("cartData"));
let y = "";
let total =0;
// console.log(cartData.length);

    for(let keys of cartData){
        // console.log(keys.productName)
    total=keys.productQuantity*keys.productPrice
        y+=`  <tr class="">
                    <td scope="row">
                        <img
                            src="${keys.productImage}"
                            class="img-fluid rounded-top"
                            alt=""
                        />
                        
                    </td>
                    <td>${keys.productName}</td>
                    <td>${keys.productQuantity}</td>
                    <td scope="row">${keys.productPrice}</td>
                    <td>${total}</td>
                    <td><a class="btn btn-info">Edit</a></td>
                    <td><a onclick="CartDelete('${keys.productId}')" class="btn btn-danger">Delete</a></td>
    
                </tr>`
    }
$("#dataTable").html(y);
// cart Delete
function CartDelete(id){
// console.log(id)
for(let index in cartData){
  if(cartData[index].productId==id){
    // console.log(cartData[index])
    cartData.splice(index,1);
    alert("cart delete");
    localStorage.setItem("cartData",JSON.stringify(cartData));
    location.assign("cart.html")

  }
}
}