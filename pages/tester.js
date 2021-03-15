import React from 'react'; 
import PageContainer from '../components/PageContainer'; 

export default function Tester() {    
    return (
        <PageContainer>
            <div> 
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Last 30 days
                </h3>
                <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                    <dt class="text-sm font-medium text-gray-500 truncate">
                        Total Subscribers
                    </dt>
                    <dd class="mt-1 text-3xl font-semibold text-gray-900">
                        71,897
                    </dd>
                    </div>
                </dl> 
            </div> 
    
        </PageContainer>
    );
}
