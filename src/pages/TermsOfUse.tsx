import { ArrowLeft, FileText, Copyright, Globe, AlertTriangle, Scale, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#005EB8] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/profile" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Terms of Use</h1>
        </div>
        <p className="text-sm text-blue-100">Rev. August 2016</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-800 font-medium leading-relaxed">
            PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY. BY ACCESSING THIS WEBSITE YOU AGREE TO BE BOUND BY THE TERMS AND CONDITIONS BELOW. THESE TERMS AND CONDITIONS ARE SUBJECT TO CHANGE.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900">General Terms</h3>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-600 leading-relaxed">
              Unauthorized use of JPMorgan Chase's websites and systems, including but not limited to unauthorized entry into JPMorgan Chase's systems, misuse of passwords, posting of objectionable or offensive content or your unauthorized use of legally protected third party content, or misuse of any information posted to a site, is strictly prohibited.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              You acknowledge that JPMorgan Chase may disclose and transfer any information that you provide through this website to (i) any company within the JPMorgan Chase group, its affiliates agents or information providers; (ii) to any other person or entity with your consent; or (iii) if we have a right or duty to disclose or are permitted or compelled to so disclose such information by law.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              You consent to the transmission, transfer or processing of such information to, or through, any country in the world, as we deem necessary or appropriate, and by using and providing information through this website you agree to such transfers.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Use of this website, including any patterns or characteristics concerning your interaction with it, may be monitored, tracked and recorded. Anyone using this website expressly consents to such monitoring, tracking and recording.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900">OFAC Compliance</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            You agree not to attempt to log on to the website from any country under sanctions by the Office of Foreign Assets Control (OFAC). Information regarding which countries are under sanctions may be obtained on the U.S. Department of the Treasury website. Any attempt to log on to the website from one of these countries may result in your access being restricted and/or terminated.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Copyright className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Copyright Notices</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            The works of authorship contained in the chase.com website, including but not limited to all design, text, sound recordings and images, are owned, except as otherwise expressly stated, by JPMorgan Chase & Co. or one of its subsidiaries. They may not be copied, transmitted, displayed, performed, distributed, licensed, altered, framed, stored for subsequent use or otherwise used in whole or in part in any manner without Chase's prior written consent, except to the extent permitted by the Copyright Act of 1976 (17 U.S.C. 107), as amended, and then, only with notices of JPMorgan Chase's proprietary rights.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Trademark Notices</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Chase is the marketing name for the retail financial services activities of JPMorgan Chase & Co. and its subsidiaries and affiliates in the United States. "Chase," "JPMorgan," "JPMorgan Chase," the JPMorgan Chase logo and the Octagon Symbol are trademarks of JPMorgan Chase Bank, N.A., a wholly-owned subsidiary of JPMorgan Chase & Co. Other featured words or symbols, used to identify the source of goods and services, may be the trademarks of their respective owners.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Web Content and Materials</h3>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-600 leading-relaxed">
              The information on this website is for information purposes only. It is believed to be reliable, but JPMorgan Chase does not warrant its completeness, timeliness or accuracy. The information on the website is not intended as an offer or solicitation for the purchase of JPMorgan Chase stock, any other security or any financial instrument.
            </p>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Securities (including mutual funds and variable life insurance), annuities and insurance products are not bank deposits and are not insured by the FDIC or any other agency of the United States, nor are they obligations of, nor insured or guaranteed by, JPMorgan Chase Bank, N.A. or their affiliates. Securities and annuities involve investment risks, including the possible loss of value.
              </p>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              The information and materials contained in this website and the terms and conditions of the access to and use of such information and materials are subject to change without notice. Products and services described, as well as associated fees, charges, interest rates, and balance requirements may differ among locations. Not all products and services are offered at all locations.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Potential Disruption of Service</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Access to the website may from time to time be unavailable, delayed, limited or slowed due to hardware failure, including among other things failures of computers, communication networks, and telecommunications lines and connections; software failure, including among other things, bugs, errors, viruses; power, telecommunications or utility failures; customs or government actions; and other causes outside our reasonable control.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Links to Other Sites</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Links to non-JPMorgan Chase websites are provided solely as pointers to information on topics that may be useful. JPMorgan Chase has no control over the content on such websites. If you choose to link to a website not controlled by JPMorgan Chase, we make no warranties concerning the content of such site. Links to non-JPMorgan Chase sites do not imply any endorsement of or responsibility for the opinions, ideas, products, information or services offered at such sites.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Scale className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Limitation of Liability</h3>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              THE WEBSITE (INCLUDING ALL INFORMATION AND MATERIALS CONTAINED ON THE WEBSITE) IS PROVIDED "AS IS" "AS AVAILABLE". JPMORGAN CHASE AND THIRD PARTY DATA PROVIDERS ARE NOT PROVIDING ANY WARRANTIES AND REPRESENTATIONS REGARDING THE WEBSITE.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              JPMorgan Chase and third party data providers disclaim all warranties and representations of any kind with regard to the website, including any implied warranties of merchantability, non-infringement of third party rights, freedom from viruses or other harmful code, or fitness for any particular purpose.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Under no circumstances will JPMorgan Chase be liable for any lost profits, lost opportunity or any indirect, consequential, incidental, special, punitive, or exemplary damages arising out of any use of or inability to use the website or any portion thereof, regardless of whether JPMorgan Chase has been apprised of the likelihood of such damages occurring and regardless of the form of action.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Scale className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Governing Law</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            In the event any of the terms or provisions of these Terms and Conditions shall be held to be unenforceable, the remaining terms and provisions shall be unimpaired. These Terms and Conditions shall be subject to any other agreements you have entered into with JPMorgan Chase. The user's access to and use of the chase.com website, and the terms of this disclaimer are governed by the laws of the State of New York.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-2">Patent Notice</h3>
          <p className="text-sm text-gray-600">
            JPMorgan Chase is licensed under U.S. Patent Numbers 5,910,988 and 6,032,137.
          </p>
        </div>

        <div className="bg-gray-100 rounded-xl p-5">
          <p className="text-xs text-gray-500 leading-relaxed">
            "Chase," "JPMorgan," "JPMorgan Chase," the JPMorgan Chase logo and the Octagon Symbol are trademarks of JPMorgan Chase Bank, N.A. JPMorgan Chase Bank, N.A. is a wholly-owned subsidiary of JPMorgan Chase & Co.
          </p>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Bank deposit accounts, such as checking and savings, may be subject to approval. Deposit products and related services are offered by JPMorgan Chase Bank, N.A. Member FDIC.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            &copy; {new Date().getFullYear()} JPMorgan Chase & Co.
          </p>
        </div>
      </div>
    </div>
  );
}
