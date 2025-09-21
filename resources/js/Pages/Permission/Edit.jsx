import React from 'react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Container from '@/Components/Container'
import { Head, useForm, usePage } from '@inertiajs/react'
import Input from '@/Components/Input'
import Button from '@/Components/Button'
import Card from '@/Components/Card'
import Swal from 'sweetalert2'

export default function Edit(auth) {
    // Destructure permission form usePage props
    const { permission } = usePage().props;

    // Define state with helper inertia
    const { data, setData, put, errors } = useForm ({
        name : permission.name,
        _method : 'put',
    });

    // Define Method handleStoreData
    const handleUpdateData = async (e) => {
        e.preventDefault();
        put(route('permissions.update', permission.id), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

    return (
        <AuthenticatedLayout
            auth={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Permission</h2>}
            >
            <Head title={'Edit Permission'} />
            <Container>
                <Card title={'Edit Permission'}>
                    <form onSubmit={handleUpdateData}>
                        <div className='mb-4'>
                            <Input
                                label={'Permission Name'}
                                type={'text'}
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                error={errors.name}
                                placeholder="Input Permission Name.."/>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Button type={'submit'}/>
                            <Button type={'cancel'} url={route('permissions.index')}/>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    )
}
