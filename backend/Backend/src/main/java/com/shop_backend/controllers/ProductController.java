package com.shop_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.HashMap;
import java.util.LinkedList;

import com.shop_backend.models.repos.ProductRepo;
import com.shop_backend.models.repos.ReviewRepo;
import com.shop_backend.models.repos.App_UserRepo;
import com.shop_backend.models.repos.CategoryRepo;

import com.shop_backend.models.entities.Product;
import com.shop_backend.models.entities.Category;
import com.shop_backend.models.entities.App_User;
import com.shop_backend.models.entities.Review;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.persistence.Query;


@Controller
@CrossOrigin("*")
@RestController
@RequestMapping(path="/product")
public class ProductController {
  @PersistenceContext
  private EntityManager entityManager;
  @Autowired
  private ProductRepo productRepository;
  @Autowired
  private CategoryRepo categoryRepository;
  @Autowired
  private App_UserRepo userRepository;
  @Autowired
  private ReviewRepo reviewRepository;

  //  Create and save a new Product object to the repository (database)
  @PostMapping(path="/add")
  public @ResponseBody String addProduct (@RequestParam String name,      @RequestParam String description,
                                          @RequestParam String origin,    @RequestParam Double price,  
                                          @RequestParam Integer in_stock, @RequestParam  Category category,
                                          @RequestParam String img) {

    //  Check if any required value is empty
    if (name == null || name.equals("") || description == null || description.equals("") 
        || origin == null || origin.equals("") || img == null || img.equals("") 
        || price == null || category == null) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Provide all the required data fields!");
    }
    
    //  Check the given Categoria exists
    if (categoryRepository.findCategoryByID(category.getID()) == null) {
        throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "A Category with the specified ID does not exist!");
    }

    //  Check the quantidade is between 1 and 100
    if (in_stock == null || in_stock < 1 || in_stock > 100) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "The in_stock value must be between 1 e 100!");
    }
    
    //  Register the Product Object
    try {
      Product prod = new Product();
      prod.setName(name);
      prod.setDescription(description);
      prod.setOrigin(origin);
      prod.setDate(new SimpleDateFormat("yyyy/MM/dd HH:mm").format(new Date()));
      prod.setImgSource(img);
      prod.setIsHotDeal(false);
      prod.setPrice(price);
      prod.setIn_Stock(in_stock);
      prod.setCategory(category);
      productRepository.save(prod);
      return "Saved";
    }
    catch (Exception e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal processing error!");
    }
  }

  //  List produtos from the repository (database)
  @GetMapping(path = "/list")
  public @ResponseBody LinkedList<HashMap<String, String>> listProduct() {
    LinkedList<HashMap<String, String>> data = new LinkedList<HashMap<String, String>>();
    List<Product> returnedVals = productRepository.listProducts();

    for (Product prod : returnedVals) {
      HashMap<String, String> temp = new HashMap<String, String>();

      //  Select what values to give to the app_user
      temp.put("id", prod.getID().toString());
      temp.put("name", prod.getName());
      temp.put("img", prod.getImgSource());
      temp.put("price", prod.getPrice().toString());
      temp.put("in_stock", prod.getIn_Stock().toString());
      temp.put("category", prod.getCategory().getName());

      if (prod.getAverage_Stars() != null) {
        temp.put("avg_stars", prod.getAverage_Stars().toString());
      }
      else {
        temp.put("avg_stars", "---");
      }
      
      data.add(temp);
    }

    return data;
  }

  //  List produtos from the repository by Category (database)
  @GetMapping(path = "/listByCategory")
  public @ResponseBody LinkedList<HashMap<String, String>> listProductByCategory(@RequestParam String categoryID ) {

    //  Check if any required value is empty
    if (categoryID == null || categoryID.equals("")) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Provide all a valid category ID!");
    }

    //  Create a sort of "JSON" like object and fill it
    LinkedList<HashMap<String, String>> data = new LinkedList<HashMap<String, String>>();
    List<Product> returnedVals = productRepository.listProductsByCategory(categoryID);

    for (Product prod : returnedVals) {
      HashMap<String, String> temp = new HashMap<String, String>();

      //  Select what values to give to the app_user
      temp.put("id", prod.getID().toString());
      temp.put("name", prod.getName());
      temp.put("img", prod.getImgSource());
      temp.put("price", prod.getPrice().toString());
      temp.put("in_stock", prod.getIn_Stock().toString());
      temp.put("category", prod.getCategory().getName());
      
      //  If the product has no reviews (and stars) give '---'
      if (prod.getAverage_Stars() != null) {
        temp.put("avg_stars", prod.getAverage_Stars().toString());
      }
      else {
        temp.put("avg_stars", "---");
      }

      data.add(temp);
    }

    return data;
  }

  //  List produtos from the repository marked as Hot Deals (database)
  @GetMapping(path = "/listHotDeals")
  public @ResponseBody LinkedList<HashMap<String, String>> listProductHotDeals() {
    LinkedList<HashMap<String, String>> data = new LinkedList<HashMap<String, String>>();
    List<Product> returnedVals = productRepository.listProductsHotDeals();

    for (Product prod : returnedVals) {
      HashMap<String, String> temp = new HashMap<String, String>();

      //  Select what values to give to the app_user
      temp.put("id", prod.getID().toString());
      temp.put("name", prod.getName());
      temp.put("img", prod.getImgSource());
      temp.put("price", prod.getPrice().toString());
      temp.put("in_stock", prod.getIn_Stock().toString());
      temp.put("category", prod.getCategory().getName());
      
      //  If the product has no reviews (and stars) give '---'
      if (prod.getAverage_Stars() != null) {
        temp.put("avg_stars", prod.getAverage_Stars().toString());
      }
      else {
        temp.put("avg_stars", "---");
      }

      data.add(temp);
    }

    return data;
  }

  //  List produtos from the repository by Name (database)
  @GetMapping(path = "/listByName")
  public @ResponseBody List listProductByName(@RequestParam String name ) {

    //  Check if any required value is empty
    if (name == null || name.equals("")) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Provide all a valid name!");
    }

    Query typedQuery;

    String query = "SELECT id, name, IMG_SOURCE, price, in_stock, categoryID FROM product WHERE name LIKE '%" + name + "%'";
    typedQuery = entityManager.createNativeQuery(query);

    return typedQuery.getResultList();
  }

  //  Get the number of total products in the repository (database)
  @GetMapping(path = "/number")
  public @ResponseBody LinkedList<HashMap<String, String>> numberOfProduct() {
    
    //  Create a "JSON"ish object
    LinkedList<HashMap<String, String>> data = new LinkedList<HashMap<String, String>>();
    HashMap<String, String> temp = new HashMap<String, String>();

    temp.put("num", productRepository.getNumberOfProducts());
    data.add(temp);

    return data;
  }

  //  View all information of a specific object based on ID
  @GetMapping(path = "/view")
  public @ResponseBody Product viewProductByID(@RequestParam Integer id) {
    Product data;

    //  Check if a Product with this ID exists
    try {
       data = productRepository.findProductByID(id);
    }
    catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal processing error!");
    }

    if (data == null) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "An entity the specified ID does not exist!");
    }

    return data;
  }

  //  Update the in_stock of a specific object based on ID
  @PostMapping(path = "/updateStock")
  public @ResponseBody String updateStock(@RequestParam Integer id, @RequestParam Integer stock) {
    Product data;

    //  Check if a Product with this ID exists
    try {
       data = productRepository.findProductByID(id);
    }
    catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal processing error!");
    }

    if (data == null) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "An entity the specified ID does not exist!");
    }

    //  Update the Product's stock and save it in the repository (database) (overwrites the old row)
    data.setIn_Stock(stock);
    productRepository.save(data);

    return "Saved";
  }

  //  Update the in_stock of a specific object based on ID
  @PostMapping(path = "/addReview")
  public @ResponseBody String addReview(@RequestParam Integer productID, @RequestParam Integer userID,
                                        @RequestParam String header, @RequestParam String description,
                                        @RequestParam Integer stars) {
    Product prod;
    App_User user;

    //  Check if given stars are between 1 and 5 (inclusive)
    if (!(1 <= stars && stars <= 5)) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "The number of Review stars must be between 1 and 5!");
    }

    //  Check if any required value is empty
    if (header == null || header.equals("") || description == null || description.equals("") || stars == null) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Provide all the required data fields!");
    }

    //  Check if a Product and User with the specified IDs exist
    try {
      prod = productRepository.findProductByID(productID);
      user = userRepository.findapp_userByID(userID);
    }
    catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal processing error!");
    }

    if (prod == null) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "A Product with the specified ID does not exist!");
    }
    if (user == null) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "A User with the specified ID does not exist!");
    }

    Review rev = new Review();
    rev.setHeader(header);
    rev.setDescription(description);
    rev.setNumStars(stars);
    rev.setUser(user.getName());
    reviewRepository.save(rev);

    prod.addReview(rev);
    prod.updateAverage_Stars();
    productRepository.save(prod);

    return "Saved";
  }



  //  Add and List methods for any Category Object
  @PostMapping(path="/category/add")
  public @ResponseBody String addCategory (@RequestParam String name, @RequestParam(required=false) String description) {

    //  Check if the required variables are empty  
    if (name == null || name.equals("")) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Provide all the required data fields!");
    }

    //  Check if the category name is unique  
    if (categoryRepository.findCategoryByName(name) != null) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "A category with the same name already exists!");
    }

    //  Create the new modelo object and save it  
    try {
      Category category = new Category();
      category.setName(name);
      category.setDescription(description);
      categoryRepository.save(category);
      return "Saved";
    }
    catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal processing Error!");
    }
  }

  //  List Categories  
  @GetMapping(path="/category/list")
  public @ResponseBody LinkedList<HashMap<String, String>> getCategories() {
    LinkedList<HashMap<String, String>> data = new LinkedList<HashMap<String, String>>();
    try {
      List<Category> returnedVals = categoryRepository.listCategories();

      //  Select what values to give to the app_user
      for (Category ctg : returnedVals) {
        HashMap<String, String> temp = new HashMap<String, String>();
        temp.put("id", ctg.getID().toString());
        temp.put("nome", ctg.getName());
        temp.put("marca", ctg.getDescription());
        data.add(temp);
      } 

      return data;
    }
    catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal processing Error!");
    }
  }

  //  View all the values of a given Category  
  @GetMapping(path="/category/view")
  public @ResponseBody Category getCategory(@RequestParam Integer id) {
    Category returnedVals;

    //  Check if a Category with this ID exists
    try {
      returnedVals = categoryRepository.findCategoryByID(id);
    }
    catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal processing error!");
    }

    if (returnedVals == null) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "A Category with the specified ID does not exist!");
    }

    return returnedVals;
  }
}