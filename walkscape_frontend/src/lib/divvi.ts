/**
 * Divvi Referral Integration for WalkScape
 * 
 * This module integrates Divvi's referral tracking system to earn rewards
 * for driving on-chain activity and user growth.
 */

import { getReferralTag, submitReferral } from '@divvi/referral-sdk';

// Your Divvi Consumer Address (Divvi Identifier)
export const DIVVI_CONSUMER_ADDRESS = '0x2b56Cf0f560f36E27BcB8B85cBFBF0A66C783a77';

/**
 * Generates a referral tag for a user's transaction
 * @param userAddress - The wallet address of the user making the transaction
 * @returns The referral tag to append to transaction data
 */
export function getDivviReferralTag(userAddress: string): string {
    return getReferralTag({
        user: userAddress as `0x${string}`,
        consumer: DIVVI_CONSUMER_ADDRESS as `0x${string}`,
    });
}

/**
 * Reports a transaction to Divvi for referral tracking
 * @param txHash - The transaction hash
 * @param chainId - The chain ID where the transaction was sent
 */
export async function reportToDivvi(txHash: string, chainId: number): Promise<void> {
    try {
        await submitReferral({
            txHash: txHash as `0x${string}`,
            chainId,
        });
        console.log('✅ Divvi referral submitted successfully:', txHash);
    } catch (error) {
        // Don't throw - Divvi reporting should not break the user experience
        console.error('⚠️ Failed to submit Divvi referral:', error);
    }
}

/**
 * Helper to handle post-transaction Divvi reporting
 * Call this after any successful transaction
 * @param txHash - The transaction hash
 * @param chainId - The chain ID (defaults to Lisk Sepolia 4202)
 */
export async function trackTransaction(txHash: string, chainId: number = 4202): Promise<void> {
    await reportToDivvi(txHash, chainId);
}
