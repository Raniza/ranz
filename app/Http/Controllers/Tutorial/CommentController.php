<?php

namespace App\Http\Controllers\Tutorial;

use App\Http\Controllers\Controller;
use App\Models\Tutorial\Comment;
use Illuminate\Http\Request;
use App\Notifications\Comment\CommentApprove;
use App\Notifications\Comment\CommentReject;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comments = Comment::with(['tutorial:id,title_id,sub_title', 'tutorial.title.author', 'user'])->notApproved()->get()->groupBy('tutorial.title_id');

        return inertia("Admin/Comment", [
            'comments' => $comments
        ]);
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
            "comment" => "required",
        ], [
            "comment.required" => "Comment tidak boleh kosong."
        ]);

        try {
            Comment::create([
                'tutorial_id' => $request->input('tutorial_id'),
                'user_id' => $request->input('user_id'),
                'comment' => $request->input('comment')
            ]);
        } catch (\Throwable $th) {
            \Log::error($th->getMessage());

            $request->session()->flash("success", false);
            return $request->session()->flash("message", "Comment gagal disimpan dalam system.");
        }

        $request->session()->flash("success", true);
        return $request->session()->flash("message", "Comment berhasil disimpan dalam system. Menunggu approval admin");
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        $comment->is_approve = true;
        $comment->save();

        $comment->load('tutorial:id,title_id');

        // dd($comment->toArray());
        $comment->user->notify(new CommentApprove($comment));

        $request->session()->flash('success', true);
        return $request->session()->flash('message', "Comment berhasil dilakukan approval.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Comment $comment)

    {
        $old_comment = $comment->load('tutorial:id,title_id');

        $reason = $request->input('reason');

        $comment->delete();

        $old_comment->user->notify(new CommentReject($old_comment, $reason));

        $request->session()->flash('success', true);
        return $request->session()->flash('message', "Comment berhasil direject dan dihapus dari system.");
    }
}
