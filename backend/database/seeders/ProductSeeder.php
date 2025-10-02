<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            ['name' => 'Laptop Dell XPS 15', 'description' => 'High-performance laptop for professionals', 'category_id' => 1, 'price' => 1299.99, 'rating' => 4.5],
            ['name' => 'iPhone 15 Pro', 'description' => 'Latest Apple smartphone with advanced features', 'category_id' => 1, 'price' => 999.99, 'rating' => 4.8],
            ['name' => 'Sony Headphones WH-1000XM5', 'description' => 'Noise-cancelling wireless headphones', 'category_id' => 1, 'price' => 399.99, 'rating' => 4.7],
            ['name' => 'T-Shirt Cotton Basic', 'description' => 'Comfortable cotton t-shirt', 'category_id' => 2, 'price' => 19.99, 'rating' => 4.2],
            ['name' => 'Jeans Levi\'s 501', 'description' => 'Classic straight fit jeans', 'category_id' => 2, 'price' => 89.99, 'rating' => 4.6],
            ['name' => 'Winter Jacket North Face', 'description' => 'Warm waterproof winter jacket', 'category_id' => 2, 'price' => 249.99, 'rating' => 4.9],
            ['name' => 'Clean Code', 'description' => 'A Handbook of Agile Software Craftsmanship', 'category_id' => 3, 'price' => 34.99, 'rating' => 4.8],
            ['name' => 'The Pragmatic Programmer', 'description' => 'Your Journey to Mastery', 'category_id' => 3, 'price' => 39.99, 'rating' => 4.7],
            ['name' => 'Design Patterns', 'description' => 'Elements of Reusable Object-Oriented Software', 'category_id' => 3, 'price' => 44.99, 'rating' => 4.6],
            ['name' => 'Garden Tool Set', 'description' => 'Complete 10-piece garden tool set', 'category_id' => 4, 'price' => 79.99, 'rating' => 4.3],
            ['name' => 'LED Desk Lamp', 'description' => 'Adjustable brightness desk lamp', 'category_id' => 4, 'price' => 49.99, 'rating' => 4.4],
            ['name' => 'Plant Pot Set', 'description' => 'Set of 5 ceramic plant pots', 'category_id' => 4, 'price' => 29.99, 'rating' => 4.5],
            ['name' => 'Yoga Mat Premium', 'description' => 'Non-slip yoga mat with carrying strap', 'category_id' => 5, 'price' => 39.99, 'rating' => 4.6],
            ['name' => 'Dumbbells Set 20kg', 'description' => 'Adjustable dumbbells set', 'category_id' => 5, 'price' => 129.99, 'rating' => 4.7],
            ['name' => 'Running Shoes Nike', 'description' => 'Lightweight running shoes', 'category_id' => 5, 'price' => 119.99, 'rating' => 4.5],
            ['name' => 'LEGO Star Wars Set', 'description' => 'Millennium Falcon building set', 'category_id' => 6, 'price' => 159.99, 'rating' => 4.9],
            ['name' => 'Barbie Dreamhouse', 'description' => 'Three-story dollhouse with furniture', 'category_id' => 6, 'price' => 199.99, 'rating' => 4.8],
            ['name' => 'Remote Control Car', 'description' => 'High-speed RC racing car', 'category_id' => 6, 'price' => 69.99, 'rating' => 4.4],
        ];

        foreach ($products as $product) {
            \App\Models\Product::create($product);
        }
    }
}
