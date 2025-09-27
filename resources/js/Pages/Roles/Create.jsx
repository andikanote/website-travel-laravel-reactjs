import React from "react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import { Head, useForm, usePage } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import Swal from "sweetalert2";

export default function create({auth}) {

    // Destructuring permissions from usePage.props
    const { permissions } = usePage().props;

    // Initialize form state with useForm hook
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        selectedPermissions: [],
    });

    // Handle form submission
    const handSelectedPermission = (e) => {
        let items = data.selectedPermissions;
        items.push(e.target.value);
        setData("selectedPermissions", items);
    };

    // Define Method to store data
    const handleStoreData = async (e) => {
        e.preventDefault();
        post(route("roles.store"), {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Role created successfully",
                    timer: 1500,
                    showConfirmButton: false,
                });
                reset();
            },
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to create role",
                });
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Role
                </h2>
            }
        >
            <Head title={"Create Role"} />
            <Container>
                <Card title={"Create New Role"}>
                    <form onSubmit={handleStoreData}>
                        <div className="mb-4">
                            <Input
                                label={"Role Name"}
                                type={"text"}
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="Input role name..."
                                error={errors.name}
                            />
                        </div>

                        <div className="mb-4">
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(permissions).map(
                                    ([group, permissionItems], i) => (
                                        <div
                                            key={i}
                                            className="p-4 bg-white rounded-lg shadow-md"
                                        >
                                            <h3 className="font-bold text-lg mb-2">
                                                {group}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {permissionItems.map(
                                                    (permission) => (
                                                        <Checkbox
                                                            label={permission}
                                                            value={permission}
                                                            onChange={
                                                                handSelectedPermission
                                                            }
                                                            key={permission}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            {errors?.selectedPermissions && (
                                                <div className="text-xs text-red-500 mt-4">
                                                    {errors.selectedPermissions}
                                                </div>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type={"submit"} />
                            <Button type={"cancel"} url={route("roles.index")} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
