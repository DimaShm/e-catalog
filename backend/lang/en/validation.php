<?php

return [
    'required' => 'The :attribute field is required.',
    'string' => 'The :attribute field must be a string.',
    'numeric' => 'The :attribute field must be a number.',
    'min' => [
        'numeric' => 'The :attribute field must be at least :min.',
    ],
    'max' => [
        'numeric' => 'The :attribute field must not be greater than :max.',
        'string' => 'The :attribute field must not be greater than :max characters.',
    ],
    'exists' => 'The selected :attribute is invalid.',

    'attributes' => [
        'name' => 'name',
        'description' => 'description',
        'category_id' => 'category',
        'price' => 'price',
        'rating' => 'rating',
    ],
];
