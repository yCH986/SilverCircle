import React, { useEffect, useState } from 'react';
import { SINGSTAT_DISTRICTS } from '../data/singstat';
import { AgeRangeOption, GenderOption } from '../types';

interface SingStatExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SingStatExplorerModal: React.FC<SingStatExplorerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'jsonSchema'>('visual');
  const [selectedDistrictId, setSelectedDistrictId] = useState('toa-payoh');
  const [selectedGender, setSelectedGender] = useState<GenderOption>('all');
  const [jsonSchemaData, setJsonSchemaData] = useState<unknown>(null);

  useEffect(() => {
    if (isOpen && activeTab === 'jsonSchema' && !jsonSchemaData) {
      fetch('/api/singstat/m810771/schema')
        .then((r) => r.json())
        .then((d) => setJsonSchemaData(d))
        .catch(() => {});
    }
  }, [isOpen, activeTab, jsonSchemaData]);

  if (!isOpen) return null;

  const currentDistrict = SINGSTAT_DISTRICTS.find(d => d.id === selectedDistrictId) || SINGSTAT_DISTRICTS[0];
  const ageCohorts: AgeRangeOption[] = ['60-64', '65-69', '70-74', '75-79', '80-84', '85-89', '90+'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="singstat-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#e3e2e0] my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-[#004349] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#abeef6] text-[#002023] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[24px]">query_stats</span>
            </div>
            <div>
              <h2 id="singstat-modal-title" className="font-headline font-bold text-2xl text-white">
                SingStat Demographics Explorer
              </h2>
              <p className="text-xs text-[#90d2da]">
                Singapore Department of Statistics Resident Senior Population Model (TS/M810771)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex border-b border-[#e3e2e0] bg-[#f4f3f1] px-6 pt-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('visual')}
            className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all cursor-pointer ${
              activeTab === 'visual'
                ? 'border-[#004349] text-[#004349]'
                : 'border-transparent text-[#6f797a] hover:text-[#1a1c1b]'
            }`}
          >
            Visual Demographics Breakdown
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('jsonSchema')}
            className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'jsonSchema'
                ? 'border-[#004349] text-[#004349]'
                : 'border-transparent text-[#6f797a] hover:text-[#1a1c1b]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">data_object</span>
            <span>SingStat JSON Schema & Logic</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-6">
          {activeTab === 'visual' ? (
            <>
              <div className="bg-[#f4f3f1] p-4 rounded-2xl border border-[#e3e2e0] text-sm text-[#3f484a] leading-relaxed">
                <strong>Data Methodology Note:</strong> SingStat Table TS/M810771 tracks resident populations by Planning Area and Age Group. SilverCircle processes these demographic figures through the backend matching scheme to rank districts with high densities of active seniors.
              </div>

              {/* District selector tabs */}
              <div>
                <label className="font-bold text-sm text-[#004349] block mb-2">
                  Select Singapore Planning Area
                </label>
                <div className="flex flex-wrap gap-2">
                  {SINGSTAT_DISTRICTS.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDistrictId(d.id)}
                      className={`px-4 py-2 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                        selectedDistrictId === d.id
                          ? 'bg-[#004349] text-white shadow-sm scale-102'
                          : 'bg-[#efeeec] hover:bg-[#e3e2e0] text-[#3f484a]'
                      }`}
                    >
                      {d.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* District Snapshot */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#f4f3f1] p-4 rounded-2xl border border-[#e3e2e0]">
                  <span className="text-xs text-[#6f797a] font-semibold uppercase">Total Seniors (60+)</span>
                  <p className="font-headline font-bold text-2xl text-[#1a1c1b] mt-1">
                    {currentDistrict.seniorPopulationTotal.toLocaleString()}
                  </p>
                  <span className="text-xs text-[#004349] font-medium">
                    {Math.round((currentDistrict.seniorPopulationTotal / currentDistrict.totalPopulation) * 100)}% of total estate population
                  </span>
                </div>

                <div className="bg-[#f4f3f1] p-4 rounded-2xl border border-[#e3e2e0]">
                  <span className="text-xs text-[#6f797a] font-semibold uppercase">Sheltered Walkway Index</span>
                  <p className="font-headline font-bold text-2xl text-[#004349] mt-1">
                    {currentDistrict.walkingShelteredScore}/100
                  </p>
                  <span className="text-xs text-[#6f797a]">
                    Barrier-free linkways
                  </span>
                </div>

                <div className="bg-[#f4f3f1] p-4 rounded-2xl border border-[#e3e2e0]">
                  <span className="text-xs text-[#6f797a] font-semibold uppercase">Senior Amenities</span>
                  <p className="font-headline font-bold text-2xl text-[#a73927] mt-1">
                    {currentDistrict.seniorCentricAmenitiesCount} Hubs
                  </p>
                  <span className="text-xs text-[#6f797a]">
                    Active aging corners & parks
                  </span>
                </div>
              </div>

              {/* Breakdown Table by Age Cohort */}
              <div className="border border-[#e3e2e0] rounded-2xl overflow-hidden">
                <div className="bg-[#efeeec] px-4 py-3 font-bold text-sm text-[#1a1c1b] flex items-center justify-between">
                  <span>Age Cohort Breakdown for {currentDistrict.name}</span>
                  <div className="flex gap-2">
                    {(['all', 'female', 'male'] as GenderOption[]).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setSelectedGender(g)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-colors ${
                          selectedGender === g ? 'bg-[#004349] text-white' : 'bg-white text-[#3f484a]'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-[#e3e2e0]">
                  {ageCohorts.map((age) => {
                    const data = currentDistrict.byAgeRange[age];
                    const count = selectedGender === 'female' ? data.female : selectedGender === 'male' ? data.male : data.male + data.female;
                    const maxInCohort = 16000;
                    const barWidth = Math.min(100, Math.round((count / maxInCohort) * 100));

                    return (
                      <div key={age} className="p-3.5 flex items-center gap-4 bg-white hover:bg-[#faf9f7]">
                        <span className="font-bold text-sm text-[#1a1c1b] w-16">
                          Ages {age}
                        </span>
                        
                        <div className="flex-grow">
                          <div className="w-full bg-[#efeeec] h-3 rounded-full overflow-hidden">
                            <div className="bg-[#004349] h-3 rounded-full" style={{ width: `${barWidth}%` }} />
                          </div>
                        </div>

                        <span className="font-bold text-sm text-[#3f484a] w-24 text-right">
                          {count.toLocaleString()} seniors
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="bg-[#f4f3f1] p-4 rounded-2xl border border-[#e3e2e0] text-sm text-[#3f484a] space-y-1">
                <div className="font-bold text-[#004349]">
                  SingStat Dataset TS/M810771 JSON Scheme Logic
                </div>
                <div>
                  <strong>Official Table URL:</strong>{' '}
                  <a
                    href="https://tablebuilder.singstat.gov.sg/table/TS/M810771"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#a73927] underline"
                  >
                    https://tablebuilder.singstat.gov.sg/table/TS/M810771
                  </a>
                </div>
                <div>
                  <strong>Backend Matching API Route:</strong>{' '}
                  <code className="bg-white px-2 py-0.5 rounded text-xs font-mono">POST /api/seniors/match</code>
                </div>
              </div>

              <div className="bg-[#1a1c1b] text-[#90d2da] p-4 rounded-2xl overflow-x-auto text-xs font-mono leading-relaxed border border-[#3f484a]">
                <pre>
                  {jsonSchemaData
                    ? JSON.stringify(jsonSchemaData, null, 2)
                    : JSON.stringify(
                        {
                          $schema: 'http://json-schema.org/draft-07/schema#',
                          title: 'SingStat_TS_M810771_Senior_Matching_Scheme',
                          datasetMetadata: {
                            tableCode: 'TS/M810771',
                            tableName: 'Singapore Citizens By Age Group, Ethnic Group And Sex, At End June',
                            tableUrl: 'https://tablebuilder.singstat.gov.sg/table/TS/M810771',
                          },
                          matchingLogic: {
                            input: {
                              gender: 'female | male | all',
                              ageRanges: ['60-64', '65-69', '70-74', '75-79', '80-84', '85-89', '90+'],
                            },
                            output: {
                              district: 'SingStatDistrictData',
                              matchRate: 'percentage',
                              potentialFriendsCount: 'number',
                              comparisonScores: 'Array<{districtName, count, percentage}>',
                            },
                          },
                        },
                        null,
                        2
                      )}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#efeeec] border-t border-[#e3e2e0] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#004349] text-white font-bold text-sm cursor-pointer hover:bg-[#0d5c63]"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
};
