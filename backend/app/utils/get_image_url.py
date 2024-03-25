import random

# Dictionary mapping common grocery items to a list of image URLs
item_images = {
    "milk": [
        "https://iconscout.com/icon/milk-54",
        "https://iconscout.com/icon/milk-55",
        # ... Add more milk image URLs
    ],
    "bread": [
        "https://iconscout.com/free-icon/bread-food-nutrition-bakery",
        "https://iconscout.com/free-icon/bread-food-diet-bake-nutrition-bakery",
        # ... Add more bread image URLs
    ],
    "onion": [
        "https://iconscout.com/icon/onion-28",
        "https://iconscout.com/3d-illustration/onion-7034913",
        # ... Add more onion image URLs
    ],
    "meat": [
        "https://iconscout.com/3d-illustration/meat-5380248",
    ],
    "garlic": [
        "https://iconscout.com/3d-illustration/garlic-5167974",
    ],
    # ... Add other grocery items
}

def get_random_image_url(item_name):
    # Retrieve the list of image URLs for the given item name, if available
    images = item_images.get(item_name.lower())
    if images:
        # Randomly select an image URL from the list
        return random.choice(images)
    else:
        # Fallback URL or action if there are no images for the given item
        return "https://iconscout.com/3d-illustration/grocery-basket-5293484"
