package ahlab.nlu;


import com.ibm.watson.developer_cloud.natural_language_understanding.v1.NaturalLanguageUnderstanding;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.AnalysisResults;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.AnalyzeOptions;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.Author;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.CategoriesOptions;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.CategoriesResult;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.ConceptsOptions;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.ConceptsResult;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.DocumentEmotionResults;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.DocumentSentimentResults;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.EmotionOptions;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.EmotionResult;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.EmotionScores;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.EntitiesOptions;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.EntitiesResult;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.FeatureSentimentResults;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.Features;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.KeywordsOptions;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.KeywordsResult;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.ListModelsResults;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.MetadataOptions;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.MetadataResult;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.Model;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.RelationArgument;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.RelationEntity;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.RelationsOptions;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.RelationsResult;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.SemanticRolesAction;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.SemanticRolesEntity;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.SemanticRolesKeyword;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.SemanticRolesObject;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.SemanticRolesOptions;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.SemanticRolesResult;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.SemanticRolesSubject;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.SemanticRolesVerb;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.SentimentOptions;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.SentimentResult;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.TargetedEmotionResults;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.TargetedSentimentResults;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.Usage;

/**
 * ServiceCall<AnalysisResults> analyze(AnalyzeOptions parameters);
*/


public class App {
    
	public static void main(String[] args) {
        final NaturalLanguageUnderstanding service = new NaturalLanguageUnderstanding(
      		  NaturalLanguageUnderstanding.VERSION_DATE_2017_02_27,
    		  "7c8f8b9a-1c24-4f57-91b5-7bb41337e35d",
    		  "wy4c1bDCHN3P"
    		);


        String text = "IBM is an American multinational technology " +
        		  "company headquartered in Armonk, New York, " +
        		  "United States, with operations in over 170 countries.";

        		EntitiesOptions entitiesOptions = new EntitiesOptions.Builder()
        		  .emotion(true)
        		  .sentiment(true)
        		  .limit(2)
        		  .build();

        		KeywordsOptions keywordsOptions = new KeywordsOptions.Builder()
        		  .emotion(true)
        		  .sentiment(true)
        		  .limit(2)
        		  .build();

        		Features features = new Features.Builder()
        		  .entities(entitiesOptions)
        		  .keywords(keywordsOptions)
        		  .build();

        		AnalyzeOptions parameters = new AnalyzeOptions.Builder()
        		  .text(text)
        		  .features(features)
        		  .build();

        		AnalysisResults response = service
        		  .analyze(parameters)
        		  .execute();
        		System.out.println(response);
	}
}
		
