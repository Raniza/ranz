<?php

namespace App\Http\Controllers\Tutorial;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tutorial\Title;
use App\Models\Tutorial\Tutorial;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class TitleController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('isEditor', except: ['show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'title' => 'required',
            'prologue' => 'required|max:500',
            'category_id' => 'required',
        ], [
            'title.required' => "Kolom title tidak boleh kosong.",
            'prologue.required' => "Prologue harus terisi.",
            'category_id' => "Category harus dipilih salah satu."
        ]);

        $validated['author'] = auth()->user()->id;

        try {
            Title::create($validated);
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());

            $request->session()->flash('success', false);
            $request->session()->flash('message', "Terjadi kegagalan dalam menyimpan data,");

            return to_route('tutorials.all.create');
        }

        $request->session()->flash('success', true);
        $request->session()->flash('message', "Title berhasil disimpan dalam system.");

        return to_route('tutorials.all.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $title = Title::with(['tutorials:id,title_id,sub_title', 'category', 'author'])->find($id);

        $title_category = Title::select('id', 'title')
                            ->where('id', "<>", $title->id)
                            ->where('category_id', $title->category_id)
                            ->whereHas('tutorials')
                            ->get();

        $tutorial_id = $request->query('tutorial_id') ?? null;

        if ($tutorial_id) {
            $tutorial = Tutorial::with(['comments' => function($query) {
                $query->approved()->with('user');
            }])->find($tutorial_id);
        } else {
            $tutorial = Tutorial::with(['comments' => function($query) {
                $query->approved()->with('user');
            }])->where('title_id', $id)->first();
        }

        return inertia("Tutorials/ShowTutorial",[
            'title' => $title,
            'tutorial' => $tutorial,
            'titleByCategory' => $title_category
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
