#!/bin/bash

# Replace with your server URL
BASE_URL="http://localhost:3000/payment/verify"

# Valid data for single orderId
curl -X POST $BASE_URL -H "Content-Type: application/json" -d '{
  "razorpay_payment_id": "pay_123456",
  "razorpay_order_id": "order_123456",
  "razorpay_signature": "valid_signature_here",
  "userid": "user_id_here",
  "orderId": "single_order_id_here",
  "addressId": "valid_address_id_here"
}'

echo -e "\n\n"

# Valid data for multiple orderIds
curl -X POST $BASE_URL -H "Content-Type: application/json" -d '{
  "razorpay_payment_id": "pay_123456",
  "razorpay_order_id": "order_123456",
  "razorpay_signature": "valid_signature_here",
  "userid": "user_id_here",
  "orderId": ["order_id_1", "order_id_2"],
  "addressId": "valid_address_id_here"
}'

echo -e "\n\n"

# Invalid signature test
curl -X POST $BASE_URL -H "Content-Type: application/json" -d '{
  "razorpay_payment_id": "pay_123456",
  "razorpay_order_id": "order_123456",
  "razorpay_signature": "invalid_signature",
  "userid": "user_id_here",
  "orderId": "single_order_id_here",
  "addressId": "valid_address_id_here"
}'

echo -e "\n\n"

# Missing order test
curl -X POST $BASE_URL -H "Content-Type: application/json" -d '{
  "razorpay_payment_id": "pay_123456",
  "razorpay_order_id": "order_123456",
  "razorpay_signature": "valid_signature_here",
  "userid": "user_id_here",
  "orderId": "non_existent_order_id",
  "addressId": "valid_address_id_here"
}'
