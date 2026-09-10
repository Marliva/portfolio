<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'     => ['required', 'string', 'min:2', 'max:100', 'regex:/^[a-zA-ZÀ-ÿ\s\-\']+$/'],
            'email'    => ['required', 'email:rfc,dns', 'max:254'],
            'message'  => ['required', 'string', 'min:10', 'max:2000'],
            'honeypot' => ['absent'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'     => 'Le nom est requis.',
            'name.min'          => 'Le nom doit faire au moins 2 caractères.',
            'name.max'          => 'Le nom ne peut pas dépasser 100 caractères.',
            'name.regex'        => 'Le nom contient des caractères invalides.',
            'email.required'    => "L'email est requis.",
            'email.email'       => "L'email n'est pas valide.",
            'email.max'         => "L'email ne peut pas dépasser 254 caractères.",
            'message.required'  => 'Le message est requis.',
            'message.min'       => 'Le message doit faire au moins 10 caractères.',
            'message.max'       => 'Le message ne peut pas dépasser 2000 caractères.',
            'honeypot.absent'   => 'Formulaire invalide.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name'    => strip_tags($this->name),
            'message' => strip_tags($this->message),
        ]);
    }
}