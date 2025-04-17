"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  HomeIcon,
  PlusCircleIcon,
  MapPinIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Address {
  province: string;
  district: string;
  ward: string;
  street: string;
  _id?: string;
}

interface UserAddressesProps {
  addresses: Address[];
}

export default function UserAddresses({
  addresses: initialAddresses,
}: UserAddressesProps) {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses || []);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [newAddress, setNewAddress] = useState<Address>({
    province: "",
    district: "",
    ward: "",
    street: "",
  });

  const handleAddAddress = () => {
    // In a real app, you would make an API call here
    setAddresses([...addresses, { ...newAddress, _id: `temp-${Date.now()}` }]);
    setNewAddress({
      province: "",
      district: "",
      ward: "",
      street: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditAddress = () => {
    // In a real app, you would make an API call here
    if (currentAddress && editIndex >= 0) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editIndex] = currentAddress;
      setAddresses(updatedAddresses);
      setIsEditDialogOpen(false);
      setCurrentAddress(null);
      setEditIndex(-1);
    }
  };

  const handleDeleteAddress = (index: number) => {
    // In a real app, you would make an API call here
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
  };

  const startEditAddress = (address: Address, index: number) => {
    setCurrentAddress({ ...address });
    setEditIndex(index);
    setIsEditDialogOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isNew = false
  ) => {
    const { name, value } = e.target;
    if (isNew) {
      setNewAddress((prev) => ({ ...prev, [name]: value }));
    } else {
      setCurrentAddress((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HomeIcon className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-xl font-bold">Addresses</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{addresses.length} addresses</Badge>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" title="Add Address">
                  <PlusCircleIcon className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Address</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="province">Province</Label>
                    <Input
                      id="province"
                      name="province"
                      value={newAddress.province}
                      onChange={(e) => handleInputChange(e, true)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      name="district"
                      value={newAddress.district}
                      onChange={(e) => handleInputChange(e, true)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ward">Ward</Label>
                    <Input
                      id="ward"
                      name="ward"
                      value={newAddress.ward}
                      onChange={(e) => handleInputChange(e, true)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="street">Street</Label>
                    <Input
                      id="street"
                      name="street"
                      value={newAddress.street}
                      onChange={(e) => handleInputChange(e, true)}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAddAddress}>Save Address</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Address</DialogTitle>
                </DialogHeader>
                {currentAddress && (
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-province">Province</Label>
                      <Input
                        id="edit-province"
                        name="province"
                        value={currentAddress.province}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-district">District</Label>
                      <Input
                        id="edit-district"
                        name="district"
                        value={currentAddress.district}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-ward">Ward</Label>
                      <Input
                        id="edit-ward"
                        name="ward"
                        value={currentAddress.ward}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-street">Street</Label>
                      <Input
                        id="edit-street"
                        name="street"
                        value={currentAddress.street}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
                <div className="flex justify-end">
                  <Button onClick={handleEditAddress}>Update Address</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {addresses.length > 0 ? (
          addresses.length > 1 ? (
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mb-4">
                {addresses.map((_, index) => (
                  <TabsTrigger key={index} value={index.toString()}>
                    Address {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              {addresses.map((address, index) => (
                <TabsContent
                  key={index}
                  value={index.toString()}
                  className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-semibold">Address {index + 1}</h3>
                      </div>

                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground">Street:</span>{" "}
                          {address.street}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Ward:</span>{" "}
                          {address.ward}
                        </p>
                        <p>
                          <span className="text-muted-foreground">
                            District:
                          </span>{" "}
                          {address.district}
                        </p>
                        <p>
                          <span className="text-muted-foreground">
                            Province:
                          </span>{" "}
                          {address.province}
                        </p>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => startEditAddress(address, index)}>
                          <EditIcon className="h-3.5 w-3.5 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteAddress(index)}>
                          <TrashIcon className="h-3.5 w-3.5 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold">Primary Address</h3>
                  </div>

                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Street:</span>{" "}
                      {addresses[0].street}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Ward:</span>{" "}
                      {addresses[0].ward}
                    </p>
                    <p>
                      <span className="text-muted-foreground">District:</span>{" "}
                      {addresses[0].district}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Province:</span>{" "}
                      {addresses[0].province}
                    </p>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => startEditAddress(addresses[0], 0)}>
                      <EditIcon className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteAddress(0)}>
                      <TrashIcon className="h-3.5 w-3.5 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <HomeIcon className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground mb-4">No addresses found</p>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(true)}>
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
