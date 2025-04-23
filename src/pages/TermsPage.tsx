
import MainLayout from "@/components/layout/MainLayout";

function TermsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              Last updated: April 1, 2025
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Introduction</h2>
            <p className="mb-4">
              These terms and conditions govern your use of the EcoShop website and the purchase of products from our store. 
              By accessing our website and/or placing an order, you agree to be bound by these terms and conditions. 
              Please read them carefully before using our website or making a purchase.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Definitions</h2>
            <p className="mb-4">
              "We", "our", "us", or "EcoShop" refers to EcoShop Inc., the owner and operator of this website.
              "You", "your", or "customer" refers to the person accessing this website and/or purchasing products from EcoShop.
              "Products" refers to any items offered for sale on our website.
              "Website" refers to the EcoShop website and all its pages.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Products and Pricing</h2>
            <p className="mb-4">
              We make every effort to accurately display our products and their colors. However, the actual colors you see will 
              depend on your monitor and we cannot guarantee that your monitor's display of any color will be accurate.
            </p>
            <p className="mb-4">
              All prices are shown in US dollars and exclude shipping costs. Shipping costs will be added at checkout. 
              We reserve the right to change prices at any time without prior notice.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Ordering and Payment</h2>
            <p className="mb-4">
              By placing an order, you are making an offer to purchase products. We reserve the right to accept or decline 
              your offer at our discretion. We accept various forms of payment, including credit/debit cards and PayPal.
            </p>
            <p className="mb-4">
              All credit/debit card holders are subject to validation checks and authorization by the card issuer. 
              If the issuer of your payment card refuses to authorize payment to us, we will not be liable for any delay or non-delivery.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Shipping and Delivery</h2>
            <p className="mb-4">
              We aim to process and ship orders promptly. Delivery times may vary depending on your location and the shipping 
              method selected. We are not responsible for delays in delivery caused by circumstances beyond our reasonable control.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Returns and Refunds</h2>
            <p className="mb-4">
              We want you to be completely satisfied with your purchase. If you are not satisfied for any reason, you may return 
              most products within 30 days of delivery for a full refund or exchange. Please see our Returns Policy for more details.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Intellectual Property</h2>
            <p className="mb-4">
              All content on this website, including text, graphics, logos, images, and software, is the property of EcoShop 
              and is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mb-4">
              You may not reproduce, distribute, modify, display, or use any content from our website without our prior written consent.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              We will not be liable for any indirect, special, or consequential losses or damages arising from your use of our website 
              or the purchase of our products, even if we have been advised of the possibility of such damages.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting 
              to the website. Your continued use of the website after any changes indicates your acceptance of the new terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these terms and conditions, please contact us at:
            </p>
            <p className="mb-4">
              Email: terms@ecoshop.com<br />
              Address: 123 Eco Street, Sustainable City, SC 12345
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default TermsPage;
