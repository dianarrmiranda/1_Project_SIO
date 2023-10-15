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

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;

import com.shop_backend.models.repos.App_UserRepo;
import com.shop_backend.models.repos.RequestRepo;
import com.shop_backend.models.repos.ShoppingCartItemRepo;
import com.shop_backend.models.repos.ProductRepo;

import com.shop_backend.models.entities.App_User;
import com.shop_backend.models.entities.Request;
import com.shop_backend.models.entities.Product;
import com.shop_backend.models.entities.ShoppingCartItem;


@Controller
@CrossOrigin("*")
@RestController
@RequestMapping(path="/user")
public class App_UserController {

  //  Needed repositories (database tables)
  @Autowired
  private App_UserRepo app_userRepository;
  @Autowired
  private RequestRepo RequestRepository;
  @Autowired
  private ShoppingCartItemRepo itemRepository;
  @Autowired
  private ProductRepo productRepository;

  //  Create and save a new app_user object to the repository (database)
  @PostMapping(path="/add")
  public @ResponseBody String addapp_user (@RequestParam String name,     @RequestParam String email,
                                       @RequestParam String password, @RequestParam String cartao,  
                                       @RequestParam String role,     @RequestParam String img) {

    //  Check if any required value is empty
    if (name == null || name.equals("") || email == null || email.equals("") 
        || password == null || password.equals("") || img == null || img.equals("") 
        || cartao == null || cartao.equals("") || role == null || role.equals("")) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Provide all the required data fields!");
    }
    
    //  Check the role is app_user or admin
    if (!role.equals("user") && !role.equals("admin")) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "The role value must either be 'user' or 'admin'!");
    }

    //  Check the given email is already associated with another user
    if (app_userRepository.findapp_userByEmail(email) != null) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "A user with this email already exists!");
    }
    
    //  Register the App_User Object
    try {
      App_User usr = new App_User();
      usr.setName(name);
      usr.setEmail(email);
      usr.setPassword(password);
      usr.setCredit_Card(cartao);
      usr.setRole(role);
      usr.setImage(img);
      app_userRepository.save(usr);
      return "Saved";
    }
    catch (Exception e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal processing error!");
    }
  }

  //  List produtos from the repository (database)
  @GetMapping(path = "/list")
  public @ResponseBody LinkedList<HashMap<String, String>> listapp_user() {
    LinkedList<HashMap<String, String>> data = new LinkedList<HashMap<String, String>>();

    //  Get all Users
    List<App_User> returnedVals = app_userRepository.listapp_users();

    //  Create an array of maps with the intended values (like a JSON object)
    for (App_User usr : returnedVals) {
      HashMap<String, String> temp = new HashMap<String, String>();

      //  Select what values to give to the app_user
      temp.put("id", usr.getID().toString());
      temp.put("name", usr.getName());
      temp.put("email", usr.getEmail());

      data.add(temp);
    }

    return data;
  }

  //  List produtos from the repository (database)
  @GetMapping(path = "/listByRole")
  public @ResponseBody LinkedList<HashMap<String, String>> listapp_userRole(@RequestParam String role) {
    
    //  Check the role is app_user or admin
    if (!role.equals("user") && !role.equals("admin")) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "The role value must either be 'user' or 'admin'!");
    }

    LinkedList<HashMap<String, String>> data = new LinkedList<HashMap<String, String>>();
    List<App_User> returnedVals = app_userRepository.listapp_usersByType(role);

    for (App_User usr : returnedVals) {
      HashMap<String, String> temp = new HashMap<String, String>();

      //  Select what values to give to the app_user
      temp.put("id", usr.getID().toString());
      temp.put("name", usr.getName());
      temp.put("email", usr.getEmail());

      data.add(temp);
    }

    return data;
  }

  //  Get the number of total app_users in the repository (database)
  @GetMapping(path = "/number")
  public @ResponseBody LinkedList<HashMap<String, String>> numberOfapp_users() {
    
    //  Create a "JSON"ish object
    LinkedList<HashMap<String, String>> data = new LinkedList<HashMap<String, String>>();
    HashMap<String, String> temp = new HashMap<String, String>();

    temp.put("num", app_userRepository.getNumberOfapp_users());
    data.add(temp);

    return data;
  }

  //  View all information of a specific object based on ID
  @GetMapping(path = "/view")
  public @ResponseBody App_User viewapp_userByID(@RequestParam Integer id) {
    App_User data;

    //  Check if a User with this ID exists
    try {
       data = app_userRepository.findapp_userByID(id);
    }
    catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal processing error!");
    }

    if (data == null) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "An entity the specified ID does not exist!");
    }

    return data;
  }

  //  View all app_user info IF email and password check out, else return bad login info
  @GetMapping(path = "/checkLogin")
  public @ResponseBody App_User checkLoginInfo(@RequestParam String email, @RequestParam String password) {
    App_User data;

    //  Check if a User with this login information exists or nor
    try {
       data = app_userRepository.findapp_userByEmailAndPassword(email, password);
    }
    catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal processing error!");
    }

    if (data == null) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "User authentication is incorrect!");
    }

    return data;
  }

  //  Update the password of a specific object based on ID
  @PostMapping(path = "/updatePassword")
  public @ResponseBody String updatePassword(@RequestParam Integer id, @RequestParam String newPassword) {
    App_User usr;

    //  Check if a User with this ID exists
    try {
      usr = app_userRepository.findapp_userByID(id);
    }
    catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal processing error!");
    }

    if (usr == null) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "A user with the specified ID does not exist!");
    }

    //  Set the new password and save the User Object (overwrite old object)
    usr.setPassword(newPassword);
    app_userRepository.save(usr);

    return "Saved";
  }

  //  Add a product to this app_user's cart
  @PostMapping(path = "/addToCart")
  public @ResponseBody String addProdToCart(@RequestParam Integer userID, @RequestParam Product prod, @RequestParam Integer quantity) {
    App_User usr;

    //  Check if a User with this ID exists
    try {
       usr = app_userRepository.findapp_userByID(userID);
    }
    catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal processing error!");
    }

    if (usr == null) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "The specified User does not exist!");
    }

    //  Create a new shopping cart item
    try {
      ShoppingCartItem item = new ShoppingCartItem();
      item.setProd(prod);
      item.setQuantity(quantity);
      itemRepository.save(item);

      //  Add the item to the user's cart
      usr.addProdToCart(item);
      app_userRepository.save(usr);
    }
    catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal processing error!");
    }

    return "Saved";
  }

  //  Remove a product from this app_user's cart
  @PostMapping(path = "/removeFromCart")
  public @ResponseBody String removeProdFromCart(@RequestParam Integer userID, @RequestParam Product prod) {
    App_User usr;

    //  Check if a User with this ID exists
    try {
       usr = app_userRepository.findapp_userByID(userID);
    }
    catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal processing error!");
    }

    if (usr == null) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "The specified User does not exist!");
    }

    //  Remove the item from the cart
    try {
       usr.removeProdFromCart(prod);
       app_userRepository.save(usr);
    }
    catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal processing error!");
    }

    return "Saved";
  }

  //  Request the current cart as an order
  @PostMapping(path = "/requestCurrentCart")
  public @ResponseBody String RequestCart(@RequestParam Integer userID) {
    App_User usr;
    String receipt = "";

    //  Check if a User with this ID exists
    try {
       usr = app_userRepository.findapp_userByID(userID);
    }
    catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal processing error!");
    }

    if (usr == null) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "The specified User does not exist!");
    }

    //  Create the receipt String object
    receipt += "------------ Client ----------\n";
    receipt += "Client Name: " + usr.getName() + "\n";
    receipt += "Client Email: " + usr.getEmail() + "\n";
    receipt += "Payment Information: " + usr.getCredit_Card() + "\n\n";

    List<ShoppingCartItem> currentCart = usr.getShopping_Cart();
    List<ShoppingCartItem> orderCart = new ArrayList<>();
    double total = 0;
    int i = 0;


    //  Check if the user has any items in its cart
    if (currentCart.size() < 1) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "The current shopping cart of this user is empty!");
    }

    //  Add the current items in the shopping cart to an order object
    receipt += "------------ Products ----------\n";
    for (ShoppingCartItem item : currentCart) {
        ShoppingCartItem orderItem = item;
        orderCart.add(orderItem);
        total += item.getProd().getPrice() * item.getQuantity();

        //  Check if requested item quantity is available
        if (item.getProd().getIn_Stock() < item.getQuantity()) {
          throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Only " + item.getProd().getIn_Stock() + " items of type " + item.getProd().getName() + " are in stock, but " + item.getQuantity() + " where requested!");
        }

        receipt += "\n ----- Product " + i + " ------\n";
        receipt += "Name: " + item.getProd().getName() + "\n";
        receipt += "Price: " + item.getProd().getPrice() + "€\n";
        receipt += "Quantity: " + item.getQuantity() + "\n";

        item.getProd().setIn_Stock(item.getProd().getIn_Stock() - item.getQuantity());
        productRepository.save(item.getProd());
        i++;
    }

    receipt += "\n------------ Total ----------\n";
    receipt += "Total: " + total + "€\n";

    //  Save the new order request and update the user's shopping history and clear the shopping cart
    Request ord = new Request();
    ord.setItem(orderCart);
    ord.setTotal(total);
    RequestRepository.save(ord);

    usr.clearFromCart();
    usr.addToRequestHistory(ord);
    app_userRepository.save(usr);

    return receipt;
  }
}