<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class EmailVerificationController extends Controller
{
    public function notice(Request $request)
    {
        return $request->user()->hasVerifiedEmail() ?
                to_route('home') : inertia('Auth/VerifyEmail');
    }

    public function verify(EmailVerificationRequest $request)
    {
        $request->fulfill();

        $request->session()->flash('success', true);
        $request->session()->flash('message', "Verifikasi Email anda berhasil.");

        return to_route('home');
    }

    public function resend(Request $request)
    {
        $request->user()->sendEmailVerificationNotification();

        $request->session()->flash('success', true);
        $request->session()->flash('message', "Link telah dikirimkan ke email and.");

        return to_route('home');
    }
}
