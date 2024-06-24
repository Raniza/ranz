<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $users = User::orderBy('name', 'asc')->get();

        return inertia('Admin/Index', [
            'users' => $users,
        ]);
    }
}
