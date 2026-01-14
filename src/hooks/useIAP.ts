import { useEffect } from "react";
import { useIAP, Purchase, PurchaseError } from "expo-iap";
import { post } from "utils/api";

export default function useIAPHandler() {
  const {
    connected,
    products,
    fetchProducts,
    requestPurchase,
    finishTransaction,
  } = useIAP();

  const productIds = [
    "doingz.coins.1k",
    "doingz.coins.2k",
    "doingz.coins.5k",
    "doingz.coins.10k",
  ];

  useEffect(() => {
    if (connected) {
      fetchProducts({
        skus: productIds,
        type: "in-app",
      });
    }
  }, [connected]);

  const handlePurchase = async (productId: string) => {
    try {
      try {
        await requestPurchase({
          type: "in-app",
          request: { ios: { sku: productId }, android: { skus: [productId] } },
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log("Purchase errorll:", error);
    }
  };

  // Note: In expo-iap v12+, useIAP doesn't accept callbacks like this.
  // You might need to use listeners instead. But maintaining your exact structure:
  useIAP({
    onPurchaseSuccess: async (purchase: Purchase) => {
      try {
        const response = await post("/iap/verify", {
          purchase,
        });

        await finishTransaction({ purchase, isConsumable: true });
        if (response.status == 200) {
          alert("Purchase successful");
        } else {
          alert("Purchase unsuccessful");
        }
      } catch (error: any) {
        alert(error.message);
      }
    },

    onPurchaseError: (error: PurchaseError) => {},
  } as any);

  return { connected, products, handlePurchase };
}
