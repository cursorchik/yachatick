<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Message;
use Inertia\Inertia;

class ChatController extends Controller
{
	public function index()
	{
		$users = User::where('id', '!=', auth()->id())->get();
		$users->map(function ($user)
		{
			$user['img'] = null;
		});

		return Inertia::render('Chat/Index', ['users' => $users,]);
	}

	public function show(User $user)
	{
		$currentUser = auth()->user();

		$messages = Message::where(function ($query) use ($currentUser, $user)
		{
			$query
				->where('sender_id', $currentUser->id)
				->where('receiver_id', $user->id);
		})
		->orWhere(function ($query) use ($currentUser, $user)
		{
			$query
				->where('sender_id', $user->id)
				->where('receiver_id', $currentUser->id);
		})
		->orderBy('created_at')->get();

		// Получаем всех пользователей, чтобы сохранить список слева
		$users = User::where('id', '!=', $currentUser->id)->get();

		return Inertia::render('Chat/Index', [
			'users' => $users,
			'chatUser' => $user,
			'messages' => $messages
		]);
	}
}
