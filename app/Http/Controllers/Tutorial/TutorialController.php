<?php

namespace App\Http\Controllers\Tutorial;

use App\Http\Controllers\Controller;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\TutorialRequest;
use App\Models\Tutorial\Title;
use App\Models\Tutorial\Tutorial;
use App\Models\Tutorial\Category;

class TutorialController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('isEditor', only: ['create', 'store', 'edit', 'publish'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $tutorials = Tutorial::with(['title.category', 'user'])->get()->groupBy('title.category.category');

        $titles = Title::with(['category', 'tutorials', 'author'])->whereHas('tutorials', function($query) {
            $query->where('is_publish', true);
        })->get()->groupBy('category.category');

        return inertia('Tutorials/Index', [
            'titles' => $titles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        $titles = Title::where('is_final', false)->get();
        
        return inertia('Tutorials/Create', [
            'categories' => $categories,
            'titles' => $titles,
            'tutorial' => null,
            'edit_mode' => false // false: create(), true: edit()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TutorialRequest $request)
    {
        $data = [
            'sub_title' => $request->input('sub_title'),
            'contents' => $request->input('content'),
            'author' => auth()->user()->id
        ];

        if ($request->input('tutorial_id')) {
            $data['title_id'] = $request->input('title');

            $tutorial = Tutorial::where('id', $request->input('tutorial_id'))->update($data);

        } else {
            $title = Title::find($request->input('title'));

            $tutorial = $title->tutorials()->create($data);
        }

        $request->session()->flash('success', true);
        return $request->session()->flash('message', "Tutorial berhasil disimpan");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tutorial = Tutorial::find($id);

        return inertia("Tutorials/ShowTutorial", [
            'tutorial' => $tutorial
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $categories = Category::all();
        $titles = Title::where('is_final', false)->get();
        $tutorial = Tutorial::with(['title'])->where('id', $id)->first();

        return inertia('Tutorials/Create', [
            'categories' => $categories,
            'titles' => $titles,
            'tutorial' => $tutorial,
            'edit_mode' => true // false: create(), true: edit()
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

    public function list()
    {

        if (auth()->user()->role === "Admin") {
            $titles = Title::with(['category', 'tutorials:id,title_id,sub_title,is_publish,created_at,updated_at', 'author'])
                        ->whereHas('tutorials')
                        ->get();
        } else {
            $titles = Title::with(['category','tutorials:id,title_id,sub_title,is_publish,created_at,updated_at', 'author'])
                        ->where('author', auth()->user()->id)
                        ->whereHas('tutorials')
                        ->get();
        }


        return inertia('Tutorials/TutorialList', [
            'titles' => $titles,
        ]);
    }

    public function publish(Request $request, string $id)
    {
        $tutorial = Tutorial::find($id);

        $tutorial->is_publish = true;

        $tutorial->save();

        $request->session()->flash('success', true);

        return $request->session()->flash('message', "Tutorial berhasil dilakukan publish.");
    }
}
