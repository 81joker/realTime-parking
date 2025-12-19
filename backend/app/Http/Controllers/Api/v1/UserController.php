<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Nette\Utils\Json;

class UserController extends Controller
{
    /**
     * Summary of store
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        User::create($data);

        return response()->json([
            'message' => 'User created successfully',
        ], 201);
    }

    // public function store(StoreUserRequest $request): JsonResponse
    // {
    //     $data = $request->validated();
    //     User::create($data);
    //     return response()->json(
    //         ['message' => 'User created successfully'],
    //         201
    //     );
    // }

    /**
     * Summary of auth
     *
     * @throws ValidationException
     */
    public function auth(AuthUserRequest $request): JsonResponse
    {
        $request->validated();
        $user = User::whereEmail($request->email)->first();
        if (! $user || ! Hash::check($request->password, $user->password)) {
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
     */
    public function logout(): JsonResponse
    {
        // auth()->user()->currentAccessToken()->delete();
        $user = request()->user();
        if ($token = $user?->currentAccessToken()) {
            $token->delete();
        }

        // auth()->user()->tokens()->delete();
        return response()->json([
            'message' => 'Logged out successfully',
        ], 200);
    }
}
