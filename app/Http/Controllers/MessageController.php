<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request, User $user)
    {
        $request->validate(['body' => 'required|string|max:1000']);

		if (auth()->id() === $user->id)
		{
			return to_route('chat.show', $user);
		}

        $message = Message::create([
            'sender_id'   => auth()->id(),
            'receiver_id' => $user->id,
            'body'        => $request->body,
        ]);

        // После отправки возвращаемся обратно в тот же чат с обновлёнными сообщениями
        return to_route('chat.show', $user);
    }
}
