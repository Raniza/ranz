<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mail\RegisteredUserMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\RegisterUserRequest;
use App\Models\User;

class AuthController extends Controller
{
    public function login()
    {
        return inertia('Auth/Login');
    }

    public function register()
    {
        return inertia('Auth/Register');
    }

    public function auth(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ], [
            'email.required' => "Masukan email anda.",
            'password' => "Masukan password anda"
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return to_route('home');
        }

        return back()->withErrors([
            'notmatch' => "Email dan atau password yang anda berikan tidak sesuai dengan record",
        ]);
    }

    public function registerUser(RegisterUserRequest $request)
    {

        try {
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => $request->input('password'),
            ]);

            event(new Registered($user));

            $credentials = $request->only('email', 'password');

            Auth::attempt($credentials);

            $request->session()->regenerate();
        } catch (\Throwable $th) {
            $err = $th->getMessage();
            \Log::error($err);

            return $request->session()->flash('message', 'Gagal dalam melakukan registrasi');
        }

        return to_route('verification.notice');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return to_route('home');
    }
}
