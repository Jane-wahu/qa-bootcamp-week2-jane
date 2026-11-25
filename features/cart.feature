Feature: Shopping cart
  As a shopper, I want to add tools to my cart and see the right total,
  so that I know what I will pay before checking out.

  Background:
    Given the shopper is on the Toolshop home page
    And the cart is empty

  Scenario: Adding a product shows it in the cart with the right total
    When the shopper opens "Combination Pliers"
    And adds 2 to the cart
    And opens the cart
    Then the cart shows "Combination Pliers" with quantity 2
    And the total is twice the price of one Combination Pliers

  Scenario: Removing the only product leaves the cart empty
    Given the cart has 1 "Combination Pliers"
    When the shopper removes "Combination Pliers" from the cart
    Then the cart is empty
    And the shopper cannot go to checkout

  Scenario: A quantity of 0 is not accepted
    When the shopper opens "Combination Pliers"
    And sets the quantity to 0
    Then the quantity goes back to 1
    And the shopper is told why