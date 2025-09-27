import React from 'react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import Pagination from '@/Components/Pagination';
import Button from '@/Components/Button';
import Search from '@/Components/Search';
import { Head, usePage } from '@inertiajs/react';
import hasAnyPermission from '@/Utils/Permission';

export default function Index({auth}) {
    const { permissions, filters } = usePage().props;

    // Untuk debugging, pastikan data permission terkirim ke sini
    // console.log('User Auth Object:', auth.user);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Permissions</h2>}
        >
            <Head title={'Permissions'} />

            <Container>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        {hasAnyPermission(['permissions create']) && (
                            <div className="w-full sm:w-auto">
                                <Button type={'add'} url={route('permissions.create')} className="w-full" />
                            </div>
                        )}
                        <div className='w-full sm:flex-grow'>
                            <Search url={route('permissions.index')} placeholder={'Search permission data by name..'} filters={filters} />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table.Card title={'Permissions List'}>
                            <Table>
                                <Table.Thead>
                                    <tr>
                                        <Table.Th className="w-16">#</Table.Th>
                                        <Table.Th>Name</Table.Th>
                                        <Table.Th className="w-40">Actions</Table.Th>
                                    </tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {permissions.data.map((permission, i) => (
                                        <tr key={permission.id}>
                                            <Table.Td>{++i + (permissions.current_page - 1) * permissions.per_page}</Table.Td>
                                            <Table.Td>{permission.name}</Table.Td>
                                            <Table.Td>
                                                <div className='flex items-center gap-2'>
                                                    {hasAnyPermission(['permissions edit']) &&
                                                        <Button type={'edit'} url={route('permissions.edit', permission.id)} />
                                                    }
                                                    {hasAnyPermission(['permissions delete']) &&
                                                        <Button type={'delete'} url={route('permissions.destroy', permission.id)} />
                                                    }
                                                </div>
                                            </Table.Td>
                                        </tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </Table.Card>
                    </div>

                    {permissions.last_page > 1 && (
                        <div className='mt-4 flex justify-center'>
                            <Pagination links={permissions.links} />
                        </div>
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
