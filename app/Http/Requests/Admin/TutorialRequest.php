<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class TutorialRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required',
            'sub_title' => 'required',
            'content' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => "Title harus dipilih salah satu",
            'sub_title.required' => "Sub title tidak boleh kosong",
            'content.required' => "Content tidak boleh kosong"
        ];
    }
}
