<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): view
    {
        $products = Product::all();
        return view("products.index", compact("products"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, ['title' => 'required', 'price' => 'required', 'description' => 'required']);

        $product = $product = Product::create(['title' => $request->title, 'price' => $request->price, 'description' => $request->description]);

        if ($product) {
            return response()->json(['status' => 'success', 'message' => 'Success! Product is created', 'product' => $product]);
        }
        return response()->json(['status' => 'failed', 'message' => 'Failed! unable to create product']);

    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        if ($product) {
            return response()->json(['status' => 'success', 'message' => 'success', 'product' => $product]);
        } else {
            return response()->json(['status' => 'failed', 'message' => 'failed']);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        if ($product) {
            $product['title'] = $request->title;
            $product['description'] = $request->description;
            $product['price'] = $request->price;
            $product->save();

            return response()->json(['status' => 'success', 'message' => 'updated', 'product' => $product]);
        }
        return response()->json(['status' => 'failed', 'message' => 'Unable to update product']);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product) {
            $product->delete();
            return response()->json(['status' => 'success', 'message' => 'succcess', 'product' => $product]);
        }
        return response()->json(['status' => 'failed', 'message' => 'Unable to delete product']);

    }
}
