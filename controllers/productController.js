const fs = require("fs");

exports.getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
  });
};

exports.getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};
   // Leer los datos y modificarlos desde postman segun el id (PUT)
exports.modificaProductoId = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
    if (foundProduct) {
          for(var i = 0; i < products.length;i++){
              if(foundProduct.id == products[i].id){
                  console.log('id el mismo');
                  for(var key in req.body){
                      if(products[i][key]){
                        products[i][key] = req.body[key];
                      }
                  }
              }
          }
      // Guardando Datos desde Postman segun el id capturado y modificado
      let json_product = JSON.stringify(products);
      fs.writeFileSync(`${__dirname}/../data/products.json`, json_product);
      res.status(201).json({
        status: "actualizado correctamente producto "+req.params.id,
      });
    } else {
      res.status(404).json({
        status: "not found",
      });
    }
  };
    // Borrando Datos desde Postman segun el id capturado (DELETE)
exports.borrarProductoId = (req, res) => { 
  let productos = JSON.parse( fs.readFileSync(`${__dirname}/../data/products.json`) ); 
const foundProduct = productos.find((p) => p.id == req.params.id); 
  if (foundProduct) { 
    productos = productos.filter((prod) => prod.id != req.params.id); 
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(productos)); 
    res.status(201).json({ 
      status: "Eliminado producto "+req.params.id,
    }); 
  } else { 
    res.status(404).json({ 
      status: "not found", });
}};