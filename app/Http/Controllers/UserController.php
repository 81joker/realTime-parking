<?php

namespace App\Http\Controllers;

class UserController extends Controller
{
    public function __invoke()
    {
        // Logic to handle the /users route
        return 'Users'; // Assuming you have a users/index.blade.php view
    }
}
