var f = require("faker");
for(var i=0;i<10;i++)
{
    console.log(f.commerce.productName()+"-"+f.commerce.price());
}
