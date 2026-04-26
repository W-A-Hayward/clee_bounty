import { useEffect, useState } from 'react'
import { companyProfile } from '../data/companyPortal'
import { studentProfile } from '../data/studentPortal'
import { pick } from '../i18n/LanguageContext'
import {
  fetchSession,
  loginCompany,
  loginStudent,
  logout,
  registerCompany,
  registerStudent,
} from './api'
import { routeHref } from './hashRouter'

export type MemberSession = {
  role: 'member'
  name: string
  email: string
  school: string
  program: string
  portfolioUrl: string
  availability: string
  rate: string
}

export type CompanySession = {
  role: 'company'
  name: string
  email: string
  companyName: string
  website: string
  industry: string
  location: string
  teamSize: string
  description: string
}

export type DemoSession = MemberSession | CompanySession | null

export type MemberAuthPayload = {
  name: string
  email: string
  password: string
  school?: string
  program?: string
  portfolioUrl?: string
  availability?: string
  rate?: string
}

export type CompanyAuthPayload = {
  name: string
  email: string
  password: string
  companyName: string
  website?: string
  industry?: string
  location?: string
  teamSize?: string
  description?: string
}

export function useDemoSession() {
  const [session, setSession] = useState<DemoSession>(null)
  const [status, setStatus] = useState<'loading' | 'ready'>('loading')

  useEffect(() => {
    let isActive = true

    const loadSession = async () => {
      try {
        const result = await fetchSession()

        if (isActive) {
          setSession(result.session)
        }
      } catch {
        if (isActive) {
          setSession(null)
        }
      } finally {
        if (isActive) {
          setStatus('ready')
        }
      }
    }

    void loadSession()

    return () => {
      isActive = false
    }
  }, [])

  const signInMember = async (payload: MemberAuthPayload, nextPath = '/dashboard') => {
    const result = await loginStudent({
      ...payload,
      availability: payload.availability ?? pick(studentProfile.availability, 'en'),
      portfolioUrl: payload.portfolioUrl ?? studentProfile.portfolioUrl,
      program: payload.program ?? pick(studentProfile.program, 'en'),
      rate: payload.rate ?? studentProfile.rate,
      school: payload.school ?? studentProfile.school,
    })

    setSession(result.session)
    window.location.hash = routeHref(nextPath)
  }

  const createMemberAccount = async (payload: MemberAuthPayload, nextPath = '/dashboard') => {
    const result = await registerStudent({
      ...payload,
      availability: payload.availability ?? pick(studentProfile.availability, 'en'),
      portfolioUrl: payload.portfolioUrl ?? studentProfile.portfolioUrl,
      program: payload.program ?? pick(studentProfile.program, 'en'),
      rate: payload.rate ?? studentProfile.rate,
      school: payload.school ?? studentProfile.school,
    })

    setSession(result.session)
    window.location.hash = routeHref(nextPath)
  }

  const signInCompany = async (payload: CompanyAuthPayload, nextPath = '/company/dashboard') => {
    const result = await loginCompany({
      ...payload,
      description: payload.description ?? pick(companyProfile.description, 'en'),
      industry: payload.industry ?? pick(companyProfile.industry, 'en'),
      location: payload.location ?? pick(companyProfile.location, 'en'),
      teamSize: payload.teamSize ?? pick(companyProfile.teamSize, 'en'),
      website: payload.website ?? companyProfile.website,
    })

    setSession(result.session)
    window.location.hash = routeHref(nextPath)
  }

  const createCompanyAccount = async (
    payload: CompanyAuthPayload,
    nextPath = '/company/dashboard',
  ) => {
    const result = await registerCompany({
      ...payload,
      description: payload.description ?? pick(companyProfile.description, 'en'),
      industry: payload.industry ?? pick(companyProfile.industry, 'en'),
      location: payload.location ?? pick(companyProfile.location, 'en'),
      teamSize: payload.teamSize ?? pick(companyProfile.teamSize, 'en'),
      website: payload.website ?? companyProfile.website,
    })

    setSession(result.session)
    window.location.hash = routeHref(nextPath)
  }

  const signOut = async () => {
    try {
      await logout()
    } finally {
      setSession(null)
      window.location.hash = routeHref('/')
    }
  }

  return {
    session,
    status,
    signInMember,
    createMemberAccount,
    signInCompany,
    createCompanyAccount,
    signOut,
  }
}
