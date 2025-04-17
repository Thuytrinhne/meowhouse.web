"use client";

import type React from "react";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  PhoneIcon,
  MailIcon,
  UserIcon,
  PencilIcon,
  CheckIcon,
  XIcon,
  ShieldIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface UserProfileProps {
  user: {
    _id: string;
    user_email: string;
    user_name: string;
    user_role: string;
    is_email_verified: boolean;
    user_avt?: string;
    user_birth_day?: string;
    user_phone_number?: string;
    user_gender?: string;
    is_active?: boolean;
    saved_coupons?: string[];
    user_cart?: Array<{
      product_id: string;
      variant_id: string;
      quantity: number;
      _id: string;
    }>;
    createdAt: string;
    updatedAt: string;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.user_name,
    email: user.user_email,
    phone: user.user_phone_number || "",
    gender: user.user_gender || "",
    birthDay: user.user_birth_day ? new Date(user.user_birth_day) : undefined,
    isActive: user.is_active !== false, // Default to true if not specified
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, birthDay: date }));
  };

  const handleActiveToggle = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the user
    console.log("Saving user data:", formData);
    // For demo purposes, just exit edit mode
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: user.user_name,
      email: user.user_email,
      phone: user.user_phone_number || "",
      gender: user.user_gender || "",
      birthDay: user.user_birth_day ? new Date(user.user_birth_day) : undefined,
      isActive: user.is_active !== false,
    });
    setIsEditing(false);
  };

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-4 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Profile Information</CardTitle>
        <Button
          variant={isEditing ? "ghost" : "outline"}
          size="icon"
          onClick={() => setIsEditing(!isEditing)}
          className={isEditing ? "hidden" : ""}>
          <PencilIcon className="h-4 w-4" />
        </Button>
        {isEditing && (
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={handleCancel}>
              <XIcon className="h-4 w-4" />
            </Button>
            <Button variant="default" size="icon" onClick={handleSave}>
              <CheckIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={user.user_avt || "/placeholder.svg"}
              alt={formData.name}
            />
            <AvatarFallback className="text-lg">
              {getInitials(formData.name)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            {isEditing ? (
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="text-center font-semibold"
              />
            ) : (
              <h2 className="text-xl font-semibold">{formData.name}</h2>
            )}
            <div className="flex items-center justify-center mt-1 space-x-2">
              <Badge
                variant={
                  user.user_role === "Admin" ? "destructive" : "default"
                }>
                {user.user_role}
              </Badge>
              {user.is_email_verified && (
                <Badge variant="outline">Verified</Badge>
              )}
              <Badge variant={formData.isActive ? "success" : "secondary"}>
                {formData.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex items-center justify-center space-x-2 pt-2">
            <Label htmlFor="user-status" className="text-sm font-medium">
              Account Status
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="user-status"
                checked={formData.isActive}
                onCheckedChange={handleActiveToggle}
              />
              <span
                className={
                  formData.isActive ? "text-green-600" : "text-gray-500"
                }>
                {formData.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-4 pt-4">
          <div className="flex items-start space-x-3">
            <MailIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Email</p>
              {isEditing ? (
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  className="h-8 mt-1"
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  {formData.email}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <PhoneIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Phone</p>
              {isEditing ? (
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="tel"
                  className="h-8 mt-1"
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  {formData.phone || "Not provided"}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <UserIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Gender</p>
              {isEditing ? (
                <Select
                  value={formData.gender}
                  onValueChange={handleSelectChange}>
                  <SelectTrigger className="h-8 mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nam">Nam</SelectItem>
                    <SelectItem value="Nữ">Nữ</SelectItem>
                    <SelectItem value="Khác">Khác</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {formData.gender || "Not provided"}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Birthday</p>
              {isEditing ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-8 mt-1 w-full justify-start text-left font-normal">
                      {formData.birthDay ? (
                        format(formData.birthDay, "PPP")
                      ) : (
                        <span className="text-muted-foreground">
                          Pick a date
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.birthDay}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {formData.birthDay
                    ? formatDate(formData.birthDay.toISOString())
                    : "Not provided"}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <ShieldIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Account Status</p>
              <p
                className={`text-sm ${formData.isActive ? "text-green-600" : "text-gray-500"}`}>
                {formData.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Member Since</p>
              <p className="font-medium">{formatDate(user.createdAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Updated</p>
              <p className="font-medium">{formatDate(user.updatedAt)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
