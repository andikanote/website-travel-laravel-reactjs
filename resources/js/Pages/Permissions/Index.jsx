import React from 'react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Container from '@/Components/Container'
import Table from '@/Components/Table'
import Pagination from '@/Components/Pagination'
import Button from '@/Components/Button'
import { Head, usePage } from '@inertiajs/react'
import Search from '@/Components/Search'
import hasAnyPermission from 'resources/Utils/Permission'


export default function Index({auth}) {
    // Destructure permissions and filters from the page props
    const { permissions, filters } = usePage().props

    // Render the page
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Permissions</h2>}
        >
            <Head title={'Permissions'} />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">\
                    {hasAnyPermission(['create-permission']) &&
                        <Button type={'add'} url={route('permissions.create')}/>
                    }
                    <div className='w-full md:w-4.6'>
                        <Search url={route('permissions.index')} placeholder={'Search permission data by name..'} filters={filters} />
                    </div>
                </div>
                <Table.Card title={'Permissions List'}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Actions</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {permissions.data.map((permission, i) =>(
                                <tr key={{ i }}>
                                    <Table.Td>{++i + (permission.current_page-1) * permissions.per_page}</Table.Td>
                                    <Table.Td>{permission.name}</Table.Td>
                                    <Table.Td>
                                        <div className='flex items-center gap-2'>
                                            {hasAnyPermission(['permission.edit']) &&
                                                <Button type={'edit'} url={route('permissions.edit', permission.id)}/>
                                            }
                                            {hasAnyPermission(['permission.delete']) &&
                                                <Button type={'delete'} url={route('permissions.destroy', permission.id)}/>
                                            }
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
                <div className='flex items-center justify-center'>
                    {permissions.las_page !== 1 && (<Pagination links={permissions.links} />)}
                </div>
            </Container>
        </AuthenticatedLayout>
    )
}
