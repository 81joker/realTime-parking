<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductsControler extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return 'Hello from ProductsController';
    }
}
