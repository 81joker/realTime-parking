<?php

namespace App\Http\Controllers;

use App\Models\User;
use Nette\Utils\Json;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\AuthUserRequest;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Summary of store
     * @param StoreUserRequest $request
     * @return JsonResponse
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        $data = $request->validated();
        User::create($data);
        return response()->json(
            ['message' => 'User created successfully'],
            201
        );
    }


    /**
     * Summary of auth
     * @param AuthUserRequest $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function auth(AuthUserRequest $request) : JsonResponse
    {
        $request->validated();
        $user = User::whereEmail($request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        return response()->json([
            'user' => UserResource::make($user),
            'access_token' => $user->createToken('new_user')->plainTextToken,
            'message' => 'Authentication successful',
        ], 200);
    }

    /**
     * Summary of logout
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        auth()->user()->currentAccessToken()->delete();
        // auth()->user()->tokens()->delete();
        return response()->json([
            'message' => 'Logged out successfully',
        ], 200);
    }
}
