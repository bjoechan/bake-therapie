# Database Schema

Source of truth: the EF Core migration at
[`backend/BakeTherapie.Api/Migrations/20260912144627_InitialCreate.cs`](../backend/BakeTherapie.Api/Migrations/20260912144627_InitialCreate.cs)
and the entity classes under [`backend/BakeTherapie.Api/Models/`](../backend/BakeTherapie.Api/Models/).
If the schema changes, regenerate this doc from the latest migration rather than hand-editing it out
of sync.

## Products

| Column | Type | Nullable |
|---|---|---|
| Id | int (identity) | PK |
| Name | nvarchar(200) | no |
| TaglineShort | nvarchar(max) | yes |
| PromotionalTags | nvarchar(max) *(`;`-delimited string)* | no |
| Summary | nvarchar(max) | yes |
| FullDescription | nvarchar(max) | yes |
| ImageUrl | nvarchar(max) | yes |
| Price | decimal(10,2) | no |
| IsAvailable | bit | no |
| DisplayOrder | int | no |

## Orders

| Column | Type | Nullable |
|---|---|---|
| Id | int (identity) | PK |
| CustomerName | nvarchar(200) | no |
| CustomerPhone | nvarchar(50) | no |
| CustomerEmail | nvarchar(320) | no |
| MarketingOptIn | bit | no |
| Status | nvarchar(20) *(enum as string: New/Confirmed/Ready/Fulfilled/Cancelled)* | no |
| PaymentStatus | nvarchar(20) *(enum as string: Unpaid/Paid/Refunded/PartiallyRefunded)* | no |
| FulfillmentType | nvarchar(20) *(enum as string: Pickup/Delivery)* | no |
| PickupLocation | nvarchar(max) | yes |
| TransactionLocation | nvarchar(200) | no |
| CreatedAt | datetimeoffset | no |
| UpdatedAt | datetimeoffset | no |
| FulfilledAt | datetimeoffset | yes |

## OrderItems

| Column | Type | Nullable |
|---|---|---|
| Id | int (identity) | PK |
| OrderId | int | no — FK → Orders.Id, `ON DELETE CASCADE` |
| ProductId | int | no — FK → Products.Id, `ON DELETE RESTRICT` |
| ProductNameSnapshot | nvarchar(200) | no |
| UnitPriceSnapshot | decimal(10,2) | no |
| Quantity | int | no |

Indexes: `IX_OrderItems_OrderId`, `IX_OrderItems_ProductId`.

## Notes on design choices

- `Status`, `PaymentStatus`, and `FulfillmentType` are stored as strings rather than ints, so the raw
  DB rows stay human-readable and match the "not ad-hoc booleans" guidance in
  [`.github/copilot-instructions.md`](../.github/copilot-instructions.md).
- `PromotionalTags` is a `List<string>` in C# but stored as a single `;`-delimited `nvarchar(max)`
  column, since SQL Server has no native array/list type. Fine for simple tags; not queryable or
  indexable per-tag if that's ever needed later.
- `OrderItems.ProductNameSnapshot` / `UnitPriceSnapshot` capture the product's name/price at order
  time, independent of later edits to the `Products` catalog — orders still reference the live
  `ProductId` via foreign key for traceability, but historical order totals don't shift if a price
  changes later.
- `OrderId` cascades on delete (deleting an order deletes its line items); `ProductId` restricts
  delete (a product referenced by any order can't be deleted outright — mark it `IsAvailable = false`
  instead).
