<?php

return [
    'required' => 'Поле :attribute є обов\'язковим.',
    'string' => 'Поле :attribute має бути рядком.',
    'numeric' => 'Поле :attribute має бути числом.',
    'min' => [
        'numeric' => 'Поле :attribute має бути не менше :min.',
    ],
    'max' => [
        'numeric' => 'Поле :attribute не може бути більше :max.',
        'string' => 'Поле :attribute не може бути більше :max символів.',
    ],
    'exists' => 'Вибране значення :attribute недійсне.',

    'attributes' => [
        'name' => 'назва',
        'description' => 'опис',
        'category_id' => 'категорія',
        'price' => 'ціна',
        'rating' => 'рейтинг',
    ],
];
