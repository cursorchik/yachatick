import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import {Head, Link} from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profile"/>
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

					<div className="flex items-center gap-4">
						<Link href={route('chat.index')}
							className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 false ">
							Назад
						</Link>
					</div>

					<div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
						<UpdateProfileInformationForm
							mustVerifyEmail={mustVerifyEmail}
							status={status}
							className="max-w-xl"/>
					</div>

					<div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
						<UpdatePasswordForm className="max-w-xl"/>
					</div>

					<div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
						<DeleteUserForm className="max-w-xl"/>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
