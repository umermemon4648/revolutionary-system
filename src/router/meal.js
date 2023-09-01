const router = require("express").Router();
const meal = require("../controllers/mealController");
const isAuthenticated = require("../middleware/auth");
const { authorizedCook, authorizedUser } = require("../middleware/role");

//✅ ➡Meals
//post
router.route("/new").post(isAuthenticated, meal.createMeal);
//get
router.route("/getMeals").get(isAuthenticated, meal.getMeals);
router.route("/mealsByCookId/:id").get(isAuthenticated, meal.getMealsByCookId);
router
  .route("/delMeal")
  .delete(isAuthenticated, authorizedCook, meal.deleteMeals);
router
  .route("/updateMeal")
  .put(isAuthenticated, authorizedCook, meal.updateMeal);
// ✅Reviews

//post
router
  .route("/addReview/:id")
  .post(isAuthenticated, authorizedUser, meal.addReviews);
//get
// router
//   .route("/reviews/:id")
//   .get(isAuthenticated, authorizedUser, meal.getReviews);
// // delete
// router
//   .route("/delReview/:id")
//   .delete(isAuthenticated, authorizedUser, meal.deleteReview);

// ✅ ➡order the Meal
//post
router
  .route("/orderMeal")
  .post(isAuthenticated, authorizedUser, meal.orderTheMeal);
//get user ordered meals
router
  .route("/userOrderedMeals")
  .get(isAuthenticated, authorizedUser, meal.getOrderedMeal);

module.exports = router;
