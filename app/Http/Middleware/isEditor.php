<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class isEditor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check() && Auth::user()->role !== "Visitor") {
            return $next($request);
        }
        
        $request->session()->flash('success', false);
        $request->session()->flash('message', "Anda tidak memiliki akses ke halaman ini");
        
        return back()->withErrors('unauthorized', 'Anda tidak memiliki authorized untuk akses halaman ini');
    }
}
