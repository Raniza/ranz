<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Http\Request;
use App\Models\Home;

class HomeController extends Controller implements HasMiddleware
{
    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('isAdmin', except: ['index']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $home = Home::first();
        return inertia('Home', ['home' => $home]);
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
        $validated = $request->validate([
            'contents' => 'required'
        ], [
            'contents.required' => 'Contents home tidak boleh kosong'
        ]);

        $home = Home::first();

        try {

            if (!$home) {
                Home::create(['contents' => $request->input('contents')]);
            } else {
                $home->update(['contents' => $request->input('contents')]);
            }

        } catch (\Throwable $th) {
            \Log::error($th->getMessage());

            $request->session()->flash("success", false);

            return $request->session()->flash("message", "Data gagal disimpan dalam database");
        }
        
        $request->session()->flash("success", true);
        $request->session()->flash("message", "Data berhasil disimpan dalam database");

        return to_route('home');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        $home = Home::first();

        return inertia("HomeEdit", [
            'home' => $home
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
