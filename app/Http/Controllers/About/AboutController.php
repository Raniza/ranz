<?php

namespace App\Http\Controllers\About;

use App\Http\Controllers\Controller;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Http\Request;
use App\Models\About;
use Carbon\Carbon;

class AboutController extends Controller implements HasMiddleware
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
     * Handle the incoming request.
     */
    public function index(Request $request)
    {
        $about = About::first();

        if ($about) {
            $about->formatted_date = Carbon::parse($about->updated_at)->diffForHumans();
        }

        // return $about;
        return inertia('About/Index', [
            'about' => $about
        ]);
    }

    public function edit()
    {
        $about = About::first();

        return inertia("About/AboutEdit", [
            'about' => $about
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'contents' => 'required',
        ], [
            'contents.required' => "Contents about tidak boleh kosong."
        ]);

        $about = About::first();

        try {
            if ($about) {
                $about->update(['contents'  => $request->input('contents')]);
            } else {
                About::create(['contents' => $request->input('contents')]);
            }

        } catch (\Throwable $th) {
            \Log::error($th->getMessage());

            $request->session()->flash("success", false);

            return $request->session()->flash("message", "Data gagal disimpan dalam database");
        }

        return to_route('about');
    }
}
