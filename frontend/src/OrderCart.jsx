import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { createOrder, FulfillmentType } from "./api";

const currencyFormatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
});

const PICKUP_LOCATIONS = ["10800 Bayview Avenue, Richmond Hill", "5000 Yonge Street, Toronto"];

const TRANSACTION_LOCATION = "Website";

const initialFormState = {
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  marketingOptIn: false,
  pickupLocation: "",
};

function OrderCart({ open, onClose, items, onIncrement, onDecrement, onRemove, onOrderPlaced }) {
  const [form, setForm] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleClose() {
    onClose();
    if (confirmedOrder) {
      setConfirmedOrder(null);
      setForm(initialFormState);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const order = await createOrder({
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        customerEmail: form.customerEmail,
        marketingOptIn: form.marketingOptIn,
        fulfillmentType: FulfillmentType.Pickup,
        pickupLocation: form.pickupLocation,
        transactionLocation: TRANSACTION_LOCATION,
        items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
      });

      setConfirmedOrder(order);
      onOrderPlaced();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box sx={{ width: { xs: "100vw", sm: 420 }, p: 3, display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
        <IconButton
          onClick={handleClose}
          aria-label="Close cart"
          sx={{ position: "absolute", top: 12, right: 12 }}
        >
          <CloseRoundedIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, pr: 5 }}>
          {confirmedOrder ? "Order confirmed" : "Your cookie box"}
        </Typography>

        {confirmedOrder ? (
          <Stack spacing={2} sx={{ flex: 1 }}>
            <Alert severity="success">
              Thanks, {confirmedOrder.customerName}! Order #{confirmedOrder.id} is in — pay on
              {confirmedOrder.fulfillmentType === FulfillmentType.Pickup ? " pickup" : " delivery"}.
            </Alert>
            <Stack spacing={1}>
              {confirmedOrder.items.map((item) => (
                <Stack key={item.productId} direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="body2">
                    {item.quantity}× {item.productName}
                  </Typography>
                  <Typography variant="body2">
                    {currencyFormatter.format(item.unitPrice * item.quantity)}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Divider />
            <Stack direction="row" sx={{ width: "100%", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: 700 }}>Total</Typography>
              <Typography sx={{ fontWeight: 700 }}>{currencyFormatter.format(confirmedOrder.total)}</Typography>
            </Stack>
            <Button variant="contained" onClick={handleClose} sx={{ borderRadius: 99, mt: "auto" }}>
              Done
            </Button>
          </Stack>
        ) : items.length === 0 ? (
          <Typography color="text.secondary">Your box is empty — add a cookie to get started.</Typography>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
            <Stack spacing={1.5} sx={{ overflowY: "auto", pr: 0.5 }}>
              {items.map((item) => (
                <Stack key={item.id} direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <Box
                    component="img"
                    src={item.image}
                    alt=""
                    sx={{ width: 52, height: 52, borderRadius: 1.5, objectFit: "cover", flexShrink: 0 }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {currencyFormatter.format(item.price)} each
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                    <IconButton size="small" onClick={() => onDecrement(item.id)} aria-label={`Remove one ${item.name}`}>
                      <RemoveRoundedIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      sx={{ minWidth: 24, textAlign: "center", fontWeight: 800, fontSize: "1.15rem", lineHeight: 1 }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton size="small" onClick={() => onIncrement(item.id)} aria-label={`Add one ${item.name}`}>
                      <AddRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name} from box`}>
                      <DeleteOutlineRoundedIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
              ))}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" sx={{ width: "100%", mb: 2, justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: 700 }}>Total</Typography>
              <Typography sx={{ fontWeight: 700 }}>{currencyFormatter.format(total)}</Typography>
            </Stack>

            <Stack spacing={1.5}>
              <TextField
                label="Name"
                required
                size="small"
                value={form.customerName}
                onChange={(e) => updateField("customerName", e.target.value)}
              />
              <TextField
                label="Phone"
                required
                size="small"
                value={form.customerPhone}
                onChange={(e) => updateField("customerPhone", e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                required
                size="small"
                value={form.customerEmail}
                onChange={(e) => updateField("customerEmail", e.target.value)}
              />

              <FormControl required size="small" fullWidth>
                <InputLabel id="pickup-location-label">Pickup location</InputLabel>
                <Select
                  labelId="pickup-location-label"
                  label="Pickup location"
                  value={form.pickupLocation}
                  onChange={(e) => updateField("pickupLocation", e.target.value)}
                >
                  {PICKUP_LOCATIONS.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={form.marketingOptIn}
                    onChange={(e) => updateField("marketingOptIn", e.target.checked)}
                  />
                }
                label="Keep me posted on new cookie drops"
              />

              {error && <Alert severity="error">{error}</Alert>}

              <Button type="submit" variant="contained" disabled={submitting} sx={{ borderRadius: 99, py: 1.1, fontWeight: 800 }}>
                {submitting ? "Placing order…" : `Place order — ${currencyFormatter.format(total)}`}
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

export default OrderCart;
