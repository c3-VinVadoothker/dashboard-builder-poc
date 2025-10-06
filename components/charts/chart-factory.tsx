"use client";

// Property Appraisal Charts
import { CoefficientDispersionChart } from './property-appraisal/coefficient-dispersion-chart';
import { PRDAnalysisChart } from './property-appraisal/prd-analysis-chart';
import { SalesRatioChart } from './property-appraisal/sales-ratio-chart';
import { SalesMapChart } from './property-appraisal/sales-map-chart';
import { PropertyTrendsChart } from './property-appraisal/property-trends-chart';

// Retail Analytics Charts
import { StoreSalesChart } from './retail-analytics/store-sales-chart';
import { InventoryLevelsChart } from './retail-analytics/inventory-levels-chart';
import { CustomerSatisfactionChart } from './retail-analytics/customer-satisfaction-chart';
import { RegionalSalesMapChart } from './retail-analytics/regional-sales-map-chart';
import { SeasonalTrendsChart } from './retail-analytics/seasonal-trends-chart';

// Healthcare Metrics Charts
import { PatientOutcomesChart } from './healthcare-metrics/patient-outcomes-chart';
import { ReadmissionRatesChart } from './healthcare-metrics/readmission-rates-chart';
import { TreatmentEffectivenessChart } from './healthcare-metrics/treatment-effectiveness-chart';
import { FacilityReadmissionMapChart } from './healthcare-metrics/facility-readmission-map-chart';
import { PatientSatisfactionChart } from './healthcare-metrics/patient-satisfaction-chart';
import { ResourceUtilizationChart } from './healthcare-metrics/resource-utilization-chart';

// Financial Risk Charts
import { PortfolioRiskChart } from './financial-risk/portfolio-risk-chart';
import { VolatilityAnalysisChart } from './financial-risk/volatility-analysis-chart';
import { CreditRiskChart } from './financial-risk/credit-risk-chart';
import { RegulatoryComplianceChart } from './financial-risk/regulatory-compliance-chart';
import { RiskDistributionMapChart } from './financial-risk/risk-distribution-map-chart';
import { MarketTrendsChart } from './financial-risk/market-trends-chart';

// C3 AI Reliability Charts
import { VibrationSeverityChart } from './c3-ai-reliability/vibration-severity-chart';
import { ProcessVariablesChart } from './c3-ai-reliability/process-variables-chart';
import { HistoricalAlertsChart } from './c3-ai-reliability/historical-alerts-chart';
import { MaintenanceHistoryChart } from './c3-ai-reliability/maintenance-history-chart';
import { SopComplianceChart } from './c3-ai-reliability/sop-compliance-chart';
import { FailurePredictionChart } from './c3-ai-reliability/failure-prediction-chart';

interface ChartFactoryProps {
  type: string;
  data: any;
  metadata?: any;
  sizeType: 'small' | 'medium' | 'large';
}

export function ChartFactory({ type, data, metadata, sizeType }: ChartFactoryProps) {
  switch (type) {
    // Property Appraisal Charts
    case 'coefficient-dispersion-chart':
      return <CoefficientDispersionChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'prd-analysis-chart':
      return <PRDAnalysisChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'sales-ratio-chart':
      return <SalesRatioChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'sales-map-chart':
      return <SalesMapChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'property-trends-chart':
      return <PropertyTrendsChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    // Retail Analytics Charts
    case 'store-sales-chart':
      return <StoreSalesChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'inventory-levels-chart':
      return <InventoryLevelsChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'customer-satisfaction-chart':
      return <CustomerSatisfactionChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'regional-sales-map-chart':
      return <RegionalSalesMapChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'seasonal-trends-chart':
      return <SeasonalTrendsChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    // Healthcare Metrics Charts
    case 'patient-outcomes-chart':
      return <PatientOutcomesChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'readmission-rates-chart':
      return <ReadmissionRatesChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'treatment-effectiveness-chart':
      return <TreatmentEffectivenessChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'facility-readmission-map-chart':
      return <FacilityReadmissionMapChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'patient-satisfaction-chart':
      return <PatientSatisfactionChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'resource-utilization-chart':
      return <ResourceUtilizationChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    // Financial Risk Charts
    case 'portfolio-risk-chart':
      return <PortfolioRiskChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'volatility-analysis-chart':
      return <VolatilityAnalysisChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'credit-risk-chart':
      return <CreditRiskChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'regulatory-compliance-chart':
      return <RegulatoryComplianceChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'risk-distribution-map-chart':
      return <RiskDistributionMapChart data={data} metadata={metadata} sizeType={sizeType} />;
    
    case 'market-trends-chart':
      return <MarketTrendsChart data={data} metadata={metadata} sizeType={sizeType} />;

    // C3 AI Reliability Charts
    case 'vibration-severity-chart':
      return <VibrationSeverityChart data={data} metadata={metadata} sizeType={sizeType} />;

    case 'process-variables-chart':
      return <ProcessVariablesChart data={data} metadata={metadata} sizeType={sizeType} />;

    case 'historical-alerts-chart':
      return <HistoricalAlertsChart data={data} metadata={metadata} sizeType={sizeType} />;

    case 'maintenance-history-chart':
      return <MaintenanceHistoryChart data={data} metadata={metadata} sizeType={sizeType} />;

    case 'sop-compliance-chart':
      return <SopComplianceChart data={data} metadata={metadata} sizeType={sizeType} />;

    case 'failure-prediction-chart':
      return <FailurePredictionChart data={data} metadata={metadata} sizeType={sizeType} />;

    default:
      // Fallback to a simple placeholder
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-sm">Unknown chart type: {type}</div>
          </div>
        </div>
      );
  }
}
