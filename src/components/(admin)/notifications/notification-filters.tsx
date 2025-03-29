"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NotificationFilters() {
  const [readStatus, setReadStatus] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [timeRange, setTimeRange] = useState("all");

  const handleReset = () => {
    setReadStatus("all");
    setShowUnreadOnly(false);
    setSelectedType("all");
    setTimeRange("all");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="unread-only">Show unread only</Label>
        <div className="flex items-center space-x-2">
          <Switch
            id="unread-only"
            checked={showUnreadOnly}
            onCheckedChange={setShowUnreadOnly}
          />
          <Label htmlFor="unread-only">
            {showUnreadOnly ? "Unread only" : "All notifications"}
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Read status</Label>
        <RadioGroup
          value={readStatus}
          onValueChange={setReadStatus}
          className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="read" id="read" />
            <Label htmlFor="read">Read</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unread" id="unread" />
            <Label htmlFor="unread">Unread</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="type-select">Notification type</Label>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger id="type-select">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="order">Order</SelectItem>
            <SelectItem value="payment">Payment</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="account">Account</SelectItem>
            <SelectItem value="promotion">Promotion</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="time-select">Time range</Label>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger id="time-select">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="week">This week</SelectItem>
            <SelectItem value="month">This month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" className="w-full" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  );
}
